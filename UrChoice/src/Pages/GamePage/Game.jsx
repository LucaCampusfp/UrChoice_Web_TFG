import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import "./Game.css";
import NextRound from "../GamePage/NextRoundDialog/NextRound";
import WinnerDialog from "../GamePage/WinnerDialog/winner";
import GameStartCountdown from "./GameStartCountdown/GameStartCountdown";
import WaitingDialog from "./WaitingDialog/waitingDialog";

const API_BASE_URL = "https://railwayserver-production-7692.up.railway.app";

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id_cat, id_room } = location.state || {};

  // Estados del juego
  const [elements, setElements] = useState([]);
  const [currentRound, setCurrentRound] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [winners, setWinners] = useState([]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [matchHistory, setMatchHistory] = useState([]);
  const [vote_game, setVoteGame] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [mostVotedGlobalImages, setMostVotedGlobalImages] = useState([]);

  // Estados de UI
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNextRound, setShowNextRound] = useState(false);
  const [showStartCountdown, setShowStartCountdown] = useState(true);

  // Estados del ganador
  const [isWinnerDialogOpen, setIsWinnerDialogOpen] = useState(false);
  const [winnerImage, setWinnerImage] = useState("");
  const [winnerName, setWinnerName] = useState("");

  // Estados de usuarios y sala
  const [usersInGame, setUsersInGame] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState('');






  // Función para verificar votos vacíos
  const verifyEmptyVotes = async () => {
    console.log("🔍 Verificando que todos los votos estén vacíos...");
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      const res = await fetch(`${API_BASE_URL}/room/${id_room}/users`);
      const users = await res.json();

      if (res.ok && Array.isArray(users)) {
        const usersWithVotes = users.filter(user => user.vote_game && user.vote_game.trim() !== '');

        if (usersWithVotes.length === 0) {
          console.log("✅ Todos los votos están vacíos");
          return true;
        }

        console.warn(`⚠️ ${usersWithVotes.length} usuarios aún tienen votos:`,
          usersWithVotes.map(u => u.id_user));
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.error("❌ No se pudo verificar votos vacíos después de varios intentos");
    return false;
  };

  // Función mejorada para reiniciar votos
  const resetAllVotes = async (isInitialReset = false) => {
    if (!id_room) return;

    try {
      console.log(isInitialReset ? "🔁 Iniciando RESET INICIAL de votos..." : "🔁 Reiniciando votos...");

      // 1. Obtener todos los usuarios
      const res = await fetch(`${API_BASE_URL}/room/${id_room}/users`);
      const users = await res.json();

      if (!res.ok || !Array.isArray(users)) {
        console.error("❌ Error al obtener usuarios para resetear votos");
        return;
      }

      // 2. Resetear votos en el servidor
      const resetPromises = users.map(user => {
        return fetch(`${API_BASE_URL}/room/updateVote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_user: user.id_user,
            id_room: id_room,
            vote_game: '',
          }),
        });
      });

      await Promise.all(resetPromises);

      // 3. Forzar actualización del estado local
      const updatedRes = await fetch(`${API_BASE_URL}/room/${id_room}/users`);
      const updatedUsers = await updatedRes.json();

      if (updatedRes.ok) {
        setUsersInGame(updatedUsers);
        setVoteGame('');
        console.log("✅ Votos reiniciados correctamente");

        if (isInitialReset) {
          console.log("🔄 Forzando refresh completo...");
          await new Promise(resolve => setTimeout(resolve, 500));
          await fetchAllVotes();
        }
      }
    } catch (error) {
      console.error('❌ Error al reiniciar votos:', error);
    }
  };

  // Función de inicialización del juego
  const initializeGame = async () => {
    if (id_cat) {
      console.log("🔄 Inicializando juego...");

      await fetchElements();
      await resetAllVotes(true);
      await verifyEmptyVotes();
      await fetchUsersInGame();
      await fetchAllVotes();

      console.log("✅ Juego inicializado correctamente");
    }
  };

  // Función para obtener votos con reintentos
  const fetchAllVotes = async () => {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        console.log(`🗳️ Obteniendo votos (intento ${attempts + 1})...`);
        const res = await fetch(`${API_BASE_URL}/room/${id_room}/users`);
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          console.table(data.map(user => ({
            Usuario: user.id_user,
            Voto: user.vote_game || 'Vacío'
          })));

          setUsersInGame(data);
          return true;
        }
      } catch (error) {
        console.error(`❌ Error en intento ${attempts + 1}:`, error);
      }

      attempts++;
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.error("❌ No se pudieron obtener los votos después de varios intentos");
    return false;
  };

  // Función para obtener usuarios en el juego
  const fetchUsersInGame = async () => {
    try {
      console.log("🔍 Buscando usuarios en el juego...");
      const res = await fetch(`${API_BASE_URL}/room/${id_room}/users`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        console.log(`👥 Usuarios en sala (${data.length}):`, data.map(u => u.id_user));
        setUsersInGame(data);
      } else {
        console.warn("⚠️ Respuesta inesperada al obtener usuarios");
      }
    } catch (e) {
      console.error('❌ Error fetching users:', e);
    }
  };

  const fetchElements = async () => {
    if (!id_cat) return;
    try {
      console.log("🖼️ Obteniendo elementos de la categoría...");
      const response = await fetch(`${API_BASE_URL}/elements/${id_cat}`);
      const data = await response.json();

      if (response.ok) {
        const formattedElements = data.map((element) => ({
          id_elem: element.id_elem,
          name_elem: element.name_elem,
          victories: element.victories,
          img_elem: `data:image/png;base64,${element.img_elem}`,
        }));

        // Solo actualiza si los elementos son diferentes
        setElements(prev => {
          if (JSON.stringify(prev) !== JSON.stringify(formattedElements)) {
            return formattedElements;
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("❌ Error fetching elements:", error);
    }
  };
  // Función para actualizar el ranking
  const updateRanking = async (winnerElement, userId) => {
    try {
      if (!winnerElement || !userId) return;

      console.log(`🏆 Actualizando ranking para elemento ${winnerElement.name_elem} y usuario ${userId}`);

      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      setGamesPlayed(parsedUser.GamesPlayed + 1);

      const updatedUser = {
        ...parsedUser,
        GamesPlayed: parsedUser.GamesPlayed + 1,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      const response = await fetch(`${API_BASE_URL}/element/winner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_elem: winnerElement.id_elem,
          victories: winnerElement.victories + 1,
          id_user: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar ranking');
      }

      console.log("📈 Ranking actualizado con éxito");
    } catch (error) {
      console.error('❌ Error en updateRanking:', error.message);
    }
  };

  // Función para esperar que todos voten
  const waitForAllVotes = async () => {
    console.log("⏳ Esperando que todos voten...");
    setIsWaiting(true);
    let attempts = 0;
    const maxAttempts = 10;

    try {
      while (attempts < maxAttempts) {
        const res = await fetch(`${API_BASE_URL}/room/${id_room}/users`);
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setUsersInGame(data);

          const firstIndex = currentRound[currentMatchIndex];
          const secondIndex = currentRound[currentMatchIndex + 1];
          const firstElem = elements[firstIndex];
          const secondElem = elements[secondIndex];

          if (!firstElem || !secondElem) {
            console.warn("Elementos no encontrados para verificar votos");
            continue;
          }

          const expectedOptions = [firstElem.name_elem, secondElem.name_elem];
          const nonVoters = data.filter(user =>
            !user.vote_game || !expectedOptions.includes(user.vote_game)
          );

          if (nonVoters.length === 0) {
            console.log("✅ Todos han votado!");
            setIsWaiting(false);
            return;
          } else {
            console.warn(`⏱️ Esperando votos de: ${nonVoters.map(u => u.id_user).join(', ')}`);
          }
        }

        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.warn('⏰ Tiempo de espera agotado para los votos');
      setIsWaiting(false);
    } catch (error) {
      console.error('❌ Error en waitForAllVotes:', error);
      setIsWaiting(false);
    }
  };

  // Función para manejar clic en elemento
  const handleClick = async (winnerIndex) => {
    if (isAnimating) return;
    console.log(`🖱️ Click en elemento ${winnerIndex}`);
    setIsAnimating(true);
    setExpandedIndex(winnerIndex);

    const winnerElement = elements[winnerIndex];
    console.log(`🏅 Elemento seleccionado: ${winnerElement.name_elem}`);
    setVoteGame(winnerElement.name_elem);
    await sendVoteToServer(winnerElement.name_elem);

    await waitForAllVotes();
    await fetchMostVotedGlobalImages();

    const firstIndex = currentRound[currentMatchIndex];
    const secondIndex = currentRound[currentMatchIndex + 1];
    const firstElem = elements[firstIndex];
    const secondElem = elements[secondIndex];

    const finalVotesRes = await fetch(`${API_BASE_URL}/room/${id_room}/users`);
    const finalVotesData = await finalVotesRes.json();

    if (!finalVotesRes.ok || !Array.isArray(finalVotesData)) {
      console.error("❌ Error al obtener votos finales");
      return;
    }

    const globalVoteCount = {
      [firstElem.name_elem]: 0,
      [secondElem.name_elem]: 0
    };

    finalVotesData.forEach(user => {
      if (user.vote_game === firstElem.name_elem) globalVoteCount[firstElem.name_elem]++;
      if (user.vote_game === secondElem.name_elem) globalVoteCount[secondElem.name_elem]++;
    });

    const globalWinnerName = globalVoteCount[firstElem.name_elem] >= globalVoteCount[secondElem.name_elem]
      ? firstElem.name_elem
      : secondElem.name_elem;

    const globalWinnerIndex = elements.findIndex(el => el.name_elem === globalWinnerName);
    const globalLoserIndex = globalWinnerIndex === firstIndex ? secondIndex : firstIndex;

    setMatchHistory(prev => [...prev, {
      winner: globalWinnerIndex,
      loser: globalLoserIndex,
      round: roundNumber
    }]);

    setWinners((prev) => [...prev, globalWinnerIndex]);
    const nextMatch = currentMatchIndex + 2;

    if (nextMatch >= currentRound.length) {
      if (winners.length + 1 === 1) {
        console.log("🎉 Tenemos un ganador!");
        setWinnerImage(elements[globalWinnerIndex].img_elem);
        setWinnerName(globalWinnerName);
        setIsWinnerDialogOpen(true);
        await updateRanking(elements[globalWinnerIndex], usersInGame[0]?.id_user);
      } else {
        console.log("🔜 Preparando siguiente ronda...");
        setShowNextRound(true);
      }
    } else {
      console.log("➡️ Pasando al siguiente match...");
      setCurrentMatchIndex(nextMatch);
      await resetAllVotes();
    }

    setExpandedIndex(null);
    setIsAnimating(false);
  };

  // Función para enviar voto al servidor
  const sendVoteToServer = async (vote) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.id_user) {
        console.warn("⚠️ Usuario no identificado para votar");
        return;
      }

      console.log(`📤 Enviando voto de ${user.id_user}: ${vote}`);

      const response = await fetch(`${API_BASE_URL}/room/updateVote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_user: user.id_user,
          id_room: id_room,
          vote_game: vote,
        }),
      });

      if (!response.ok) {
        console.warn(`⚠️ No se pudo registrar voto para usuario ${user.id_user}`);
        throw new Error('Error al actualizar el voto');
      }

      console.log(`✅ Voto registrado para ${user.id_user}`);

      const updatedResponse = await fetch(`${API_BASE_URL}/room/${id_room}/users`);
      const updatedData = await updatedResponse.json();

      if (updatedResponse.ok && Array.isArray(updatedData)) {
        setUsersInGame(updatedData);
        console.log("🔄 Estado de usuarios actualizado con votos frescos");
      }

    } catch (error) {
      console.error('❌ Error al enviar el voto:', error);
    }
  };
  // a
  // Función para obtener imágenes más votadas
  const fetchMostVotedGlobalImages = async () => {
    console.log("🌍 Calculando imágenes más votadas a nivel global...");

    const freshResponse = await fetch(`${API_BASE_URL}/room/${id_room}/users`);
    const freshData = await freshResponse.json();
    fetchAllVotes();
    fetchElements();
    fetchUsersInGame();

    if (!freshResponse.ok || !Array.isArray(freshData)) {
      console.error("❌ Error al obtener datos frescos para votación global");
      return;
    }

    setUsersInGame(freshData);


    const firstIndex = currentRound[currentMatchIndex];
    const secondIndex = currentRound[currentMatchIndex + 1];
    const firstElem = elements[firstIndex];
    const secondElem = elements[secondIndex];

    if (!firstElem || !secondElem) {
      console.warn("⚠️ Elementos no encontrados para calcular votos globales");
      return;
    }

    console.log("⚔️ Match actual (global):", {
      [firstElem.name_elem]: 0,
      [secondElem.name_elem]: 0
    });

    const globalVoteCount = {
      [firstElem.name_elem]: 0,
      [secondElem.name_elem]: 0
    };

    freshData.forEach(user => {
      if (user.vote_game === firstElem.name_elem) {
        globalVoteCount[firstElem.name_elem]++;
      } else if (user.vote_game === secondElem.name_elem) {
        globalVoteCount[secondElem.name_elem]++;
      }
    });

    console.table([
      { Opción: firstElem.name_elem, Votos: globalVoteCount[firstElem.name_elem] },
      { Opción: secondElem.name_elem, Votos: globalVoteCount[secondElem.name_elem] }
    ]);

    const mostVotedGlobalName = globalVoteCount[firstElem.name_elem] >= globalVoteCount[secondElem.name_elem]
      ? firstElem.name_elem
      : secondElem.name_elem;

    console.log(`🏆 Más votado globalmente: ${mostVotedGlobalName}`);

    const mostVotedGlobalElement = elements.find(el => el.name_elem === mostVotedGlobalName);

    if (mostVotedGlobalElement) {
      setMostVotedGlobalImages(prev => [...prev, {
        img: mostVotedGlobalElement.img_elem,
        name: mostVotedGlobalElement.name_elem,
        round: roundNumber
      }]);

      console.log("📌 Imagen más votada globalmente guardada:", mostVotedGlobalElement.name_elem);
    }
  };

  // Función para manejar siguiente ronda
  const handleNextRoundComplete = () => {
    console.log("🔄 Completando ronda...");

    try {
      fetchAllVotes();
      resetAllVotes();

      setCurrentRound([...winners]);
      setWinners([]);
      setCurrentMatchIndex(0);
      setShowNextRound(false);
      setRoundNumber(prev => prev + 1);

      console.log(`🆕 Nueva ronda #${roundNumber + 1} iniciada`);
    } catch (error) {
      console.error('❌ Error en handleNextRoundComplete:', error);
    }
  };

  // Efectos
  useEffect(() => {
    console.log("🚀 Montando componente GamePage...");
    fetchAllVotes();
    fetchElements();
    fetchUsersInGame();


    const startGame = async () => {
      fetchAllVotes();
      fetchElements();
      fetchUsersInGame();
      setShowStartCountdown(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await initializeGame();

      setShowStartCountdown(false);
    };

    startGame();

    const usersInterval = setInterval(fetchUsersInGame, 5000);
    const votesInterval = setInterval(fetchAllVotes, 2000);

    return () => {
      console.log("🧹 Limpiando GamePage...");

      clearInterval(usersInterval);
      clearInterval(votesInterval);
    };
  }, [id_cat]);


  const initialRound = useMemo(() => {
    return elements.length > 0 ? Array.from({ length: elements.length }, (_, i) => i) : [];
  }, [elements]);
  // Y agrega este useEffect para la inicialización:
  useEffect(() => {
    if (elements.length > 0 && currentRound.length === 0) {
      console.log("🃏 Configurando ronda inicial");
      setCurrentRound(initialRound);
    }
  }, [elements, initialRound, currentRound]);

  useEffect(() => {
    if (vote_game && vote_game.trim() !== '') {
      console.log(`🗳️ Voto local cambiado a: ${vote_game}`);
      sendVoteToServer(vote_game);
    }
  }, [vote_game]);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("⏱️ Intervalo ejecutado");
      // fetchAllVotes();
    }, 3000); // cada 3 segundos

    return () => clearInterval(interval);
  }, []);


  // Renderizado condicional
  if (showStartCountdown || elements.length === 0) {
    return (
      <>
        {showStartCountdown ? (
          <GameStartCountdown onComplete={() => setShowStartCountdown(false)} />
        ) : (
          <div className="text-white text-center mt-8">Cargando cartas...</div>
        )}
      </>
    );
  }

  if (currentRound.length === 1) {
    navigate("/HomePage", {
      state: {
        winner: currentRound[0],
        history: matchHistory,
        mostVotedGlobalImages
      }
    });
    return null;
  }

  const firstIndex = currentRound[currentMatchIndex];
  const secondIndex = currentRound[currentMatchIndex + 1];
  const matchesCount = Math.ceil(currentRound.length / 2);
  const currentMatch = currentMatchIndex / 2 + 1;

  return (
    <div className="game-page relative min-h-screen bg-gray-900">
      <header className="pt-6 px-4 text-center">
        <span className="text-gray-300">
          Ronda {roundNumber} - Match {currentMatch} de {matchesCount}
        </span>
      </header>

      <div className={`gallery ${expandedIndex !== null ? "expanding" : ""} ${showNextRound ? "opacity-50" : ""}`}>
        {[firstIndex, secondIndex].map((globalIndex, idx) => {
          const element = elements[globalIndex];
          if (!element) return null;

          return (
            <div
              className={`item ${isAnimating ? "no-pointer" : ""}`}
              key={idx}
              onClick={() => !showNextRound && handleClick(globalIndex)}
            >
              <img
                src={element.img_elem}
                alt={element.name_elem}
                className={`gallery-img 
                  ${expandedIndex === globalIndex ? "expanded" : ""}
                  ${expandedIndex !== null && expandedIndex !== globalIndex ? "grayscale" : ""}
                  ${isAnimating ? "keep-hover" : ""}
                `}
              />
              <div className="label-container">
                <span className="label">{element.name_elem}</span>
              </div>
            </div>
          );
        })}
      </div>

      {showNextRound && (
        <NextRound onComplete={handleNextRoundComplete} roundNumber={roundNumber} />
      )}

      {isWaiting && (
        <WaitingDialog
          isOpen={isWaiting}
          message="Esperando a que todos los jugadores voten..."
          onClose={() => { }}
          showCloseButton={false}
        />
      )}

      {isWinnerDialogOpen && (
        <WinnerDialog
          isOpen={isWinnerDialogOpen}
          winnerImage={winnerImage}
          winnerName={winnerName}
          onClose={() => setIsWinnerDialogOpen(false)}
        />
      )}

      <footer className="absolute bottom-0 w-full p-4 text-center text-gray-400 text-sm">
        Haz clic en tu carta favorita
      </footer>
    </div>
  );
};

export default GamePage;
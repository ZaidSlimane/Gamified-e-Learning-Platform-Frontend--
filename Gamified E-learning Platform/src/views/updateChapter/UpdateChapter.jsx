import React, { useEffect, useState } from 'react';
import RootContainer from "../../utils/rootContainerModule.jsx";
import {useNavigate, useParams} from "react-router-dom";
import TextInput from "../../components/textInput/textInput.jsx";
import './UpdateChpater.css';
import PixelatdButton from "../../components/pixelatedButton/pixelatedButton.jsx";


function UpdateChapter() {

    const { chapterId } = useParams();
    const [chapter, setChapter] = useState({ chapterName: '', content: '' });
    const [games, setGames] = useState([]);
    const [newGames, setNewGames] = useState([]);

    async function fetchChapter() {
        const response = await fetch(`http://127.0.0.1:8000/api/chapters/${chapterId}/`);
        const chapterData = await response.json();
        setChapter(chapterData);
        return chapterData;
    }

    async function fetchGames() {
        const response = await fetch(`http://127.0.0.1:8000/api/chapter/${chapterId}/games`);
        const gamesData = await response.json();
        setGames(gamesData);
        return gamesData;
    }

    useEffect(() => {
        fetchChapter();
        fetchGames();
    }, [chapterId]);

    const handleAddGame = () => {
        setNewGames([...newGames, { question_text: '', answer1_text: '', answer2_text: '', answer3_text: '', correct_answer: 1 }]);
    };

    const handleRemoveGame = (index, isExistingGame) => {
        if (isExistingGame) {
            const gameId = games[index].id;
            fetch(`http://127.0.0.1:8000/api/games/${gameId}/`, {
                method: 'DELETE',
            }).then(() => {
                setGames(games.filter((_, i) => i !== index));
            });
        } else {
            setNewGames(newGames.filter((_, i) => i !== index));
        }
    };

    const navigate = useNavigate();
    const handleSave = async () => {
        try {
            // Update Chapter
            const chapterResponse = await fetch(`http://127.0.0.1:8000/api/chapters/${chapterId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chapter),
            });
            if (!chapterResponse.ok) {
                throw new Error(`Failed to update chapter: ${chapterResponse.statusText}`);
            }


            // Update existing games
            for (const game of games) {
                const gameResponse = await fetch(`http://127.0.0.1:8000/api/games/${game.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...game,
                        game_name: '3D QUIZ',
                        game_points: 10,
                        chapter: chapterId,
                    }),
                });
                if (!gameResponse.ok) {
                    throw new Error(`Failed to update game ${game.id}: ${gameResponse.statusText}`);
                }
            }


            // Add new games
            for (const newGame of newGames) {
                const newGameResponse = await fetch(`http://127.0.0.1:8000/api/games/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...newGame,
                        game_name: '3D QUIZ',
                        game_points: 10,
                        chapter: chapterId,
                    }),
                });
                if (!newGameResponse.ok) {
                    throw new Error(`Failed to add new game: ${newGameResponse.statusText}`);
                }

            }
            navigate(`/specialist/course/${chapter.course}`)
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleInputChange = (e, index, field, isExistingGame) => {
        if (isExistingGame) {
            const updatedGames = [...games];
            updatedGames[index][field] = e.target.value;
            setGames(updatedGames);
        } else {
            const updatedNewGames = [...newGames];
            updatedNewGames[index][field] = e.target.value;
            setNewGames(updatedNewGames);
        }
    };

    const handleChapterChange = (e, field) => {
        setChapter({ ...chapter, [field]: e.target.value });
    };

    return (
        <RootContainer>
            <br />
            <br />
            <div className="mt-5 d-flex flex-column align-items-center">
                <div>
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Chapter name:</b></p>
                    <TextInput className="grey-bg question ps-3 pe-3 pt-2"
                               defaultValue={chapter.chapterName}
                               onChange={(e) => handleChapterChange(e, 'chapterName')}
                    />
                </div>
                <div className="mt-5">
                    <p style={{ color: "#01F401", marginLeft: "8px" }}><b>Chapter content:</b></p>
                    <textarea className="grey-bg chapter-content question ps-3 pe-3 pt-2"
                              defaultValue={chapter.content}
                              onChange={(e) => handleChapterChange(e, 'content')}
                    />
                </div>
                {games.map((game, index) => (
                    <div key={index} className="mt-5 border-question game-section">
                        <p style={{ color: "#01F401", marginLeft: "8px" }}><b>question {index + 1}:</b></p>
                        <textarea className="grey-bg game-question question ps-3 pe-3 pt-2"
                                  defaultValue={game.question_text}
                                  onChange={(e) => handleInputChange(e, index, 'question_text', true)}
                        />
                        <div>
                            <p style={{ color: "#01F401", marginLeft: "8px" }} className="mt-3"><b>Answer 1:</b></p>
                            <textarea className="grey-bg game-question question ps-3 pe-3 pt-2"
                                      defaultValue={game.answer1_text}
                                      onChange={(e) => handleInputChange(e, index, 'answer1_text', true)}
                            />
                        </div>
                        <div>
                            <p style={{ color: "#01F401", marginLeft: "8px" }} className="mt-3"><b>Answer 2:</b></p>
                            <textarea className="grey-bg game-question question ps-3 pe-3 pt-2"
                                      defaultValue={game.answer2_text}
                                      onChange={(e) => handleInputChange(e, index, 'answer2_text', true)}
                            />
                        </div>
                        <div>
                            <p style={{ color: "#01F401", marginLeft: "8px" }} className="mt-3"><b>Answer 3:</b></p>
                            <textarea className="grey-bg game-question question ps-3 pe-3 pt-2"
                                      defaultValue={game.answer3_text}
                                      onChange={(e) => handleInputChange(e, index, 'answer3_text', true)}
                            />
                        </div>
                        <div>
                            <p style={{ color: "#01F401", marginLeft: "8px" }} className="mt-3"><b>Correct answer:</b></p>
                            <select defaultValue={game.correct_answer}
                                    className="ms-2 grey-bg text-white select-answer ps-2"
                                    onChange={(e) => handleInputChange(e, index, 'correct_answer', true)}
                            >
                                <option value="1">Answer 1</option>
                                <option value="2">Answer 2</option>
                                <option value="3">Answer 3</option>
                            </select>
                        </div>
                        <br/>
                        <PixelatdButton text="Remove Game" onClick={() => handleRemoveGame(index, true)} className="remove-game-button">
                            Remove Game
                        </PixelatdButton>
                    </div>
                ))}
                {newGames.map((newGame, index) => (
                    <div key={`new-${index}`} className="mt-5 border-question game-section">
                        <p style={{ color: "#01F401", marginLeft: "8px" }}><b>New question {index + 1}:</b></p>
                        <textarea className="grey-bg game-question question ps-3 pe-3 pt-2"
                                  defaultValue={newGame.question_text}
                                  onChange={(e) => handleInputChange(e, index, 'question_text', false)}
                        />
                        <div>
                            <p style={{ color: "#01F401", marginLeft: "8px" }} className="mt-3"><b>Answer 1:</b></p>
                            <textarea className="grey-bg game-question question ps-3 pe-3 pt-2"
                                      defaultValue={newGame.answer1_text}
                                      onChange={(e) => handleInputChange(e, index, 'answer1_text', false)}
                            />
                        </div>
                        <div>
                            <p style={{ color: "#01F401", marginLeft: "8px" }} className="mt-3"><b>Answer 2:</b></p>
                            <textarea className="grey-bg game-question question ps-3 pe-3 pt-2"
                                      defaultValue={newGame.answer2_text}
                                      onChange={(e) => handleInputChange(e, index, 'answer2_text', false)}
                            />
                        </div>
                        <div>
                            <p style={{ color: "#01F401", marginLeft: "8px" }} className="mt-3"><b>Answer 3:</b></p>
                            <textarea className="grey-bg game-question question ps-3 pe-3 pt-2"
                                      defaultValue={newGame.answer3_text}
                                      onChange={(e) => handleInputChange(e, index, 'answer3_text', false)}
                            />
                        </div>
                        <div>
                            <p style={{ color: "#01F401", marginLeft: "8px" }} className="mt-3"><b>Correct answer:</b></p>
                            <select defaultValue={newGame.correct_answer}
                                    className="ms-2 grey-bg text-white select-answer ps-2"
                                    onChange={(e) => handleInputChange(e, index, 'correct_answer', false)}
                            >
                                <option value="1">Answer 1</option>
                                <option value="2">Answer 2</option>
                                <option value="3">Answer 3</option>
                            </select>
                        </div>
                        <br/>
                        <PixelatdButton text="Remove game"onClick={() => handleRemoveGame(index, false)} className="remove-game-button">
                            Remove Game
                        </PixelatdButton>
                    </div>
                ))}
                <div className="d-flex justify-content-center mt-4 mb-5">
                    <PixelatdButton text="ADD GAME" onClick={handleAddGame} />
                    <div className="ms-4 me-4"></div>
                    <PixelatdButton text="SAVE" onClick={handleSave} />
                </div>
            </div>

        </RootContainer>
    );
}

export default UpdateChapter;

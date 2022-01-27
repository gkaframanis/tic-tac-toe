import React, { useState, useEffect } from 'react';
import './App.css';

const initMatrix = [];

function App() {
	const [matrix, setMatrix] = useState(initMatrix);
	const [matrixSize, setMatrixSize] = useState(3);
	const [currentPlayer, setCurrentPlayer] = useState('o');
	const [selectedRow, setSelectedRow] = useState(null);
	const [selectedCol, setSelectedCol] = useState(null);
	const [winner, setWinner] = useState(false);
	const [reset, setReset] = useState(false);

	useEffect(() => {
		setWinner(false);
		setSelectedCol(null);
		setSelectedRow(null);

		const row = new Array(matrixSize).fill(null);

		const tempMatrix = [];

		for (let i = 0; i < matrixSize; i++) {
			tempMatrix.push([...row]);
		}

		setMatrix(tempMatrix);
	}, [reset]);

	const squareClick = (row, col) => {
		if (!matrix[row][col] && !winner) {
			setSelectedCol(col);
			setSelectedRow(row);
			let nextPlayer = currentPlayer === 'x' ? 'o' : 'x';
			setCurrentPlayer(nextPlayer);
			const matrixCopy = [...matrix];
			matrixCopy[row][col] = nextPlayer;
			setMatrix(matrixCopy);
		}
	};

	const isWinner = () => {
		let vertical = true;
		let horizontal = true;
		let diagonal1 = true;
		let diagonal2 = true;

		if (selectedCol === null || selectedRow === null) {
			return;
		}

		for (let i = 0; i < matrix.length; i++) {
			if (matrix[i][selectedCol] !== currentPlayer) {
				vertical = false;
			}

			if (matrix[i][selectedRow] !== currentPlayer) {
				horizontal = false;
			}

			if (matrix[i][i] !== currentPlayer) {
				diagonal1 = false;
			}

			if (matrix[i][matrixSize - i - 1] !== currentPlayer) {
				diagonal2 = false;
			}
		}
		if (vertical || horizontal || diagonal1 || diagonal2) {
			setWinner(true);
		}
	};

	useEffect(() => {
		if (!winner) {
			isWinner();
		}
	});

	const resetGameHandle = () => {
		setReset(!reset);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<button onClick={resetGameHandle}>Reset Game</button>
				<div>
					{matrix.map((val, col) => (
						<div className='c'>
							{val.map((val1, row) => (
								<div
									onClick={() => {
										squareClick(row, col);
									}}
									className='r'
								>
									{matrix[row][col]}
								</div>
							))}
						</div>
					))}
				</div>
				<h2>{winner ? `Player ${currentPlayer} is a winner` : ''}</h2>
			</header>
		</div>
	);
}

export default App;

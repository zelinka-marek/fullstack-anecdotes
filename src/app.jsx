import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

function Display(props) {
  const { anecdote, points } = props;

  return (
    <div>
      <div style={{ maxWidth: 640 }}>{anecdote}</div>
      <div>
        has <strong>{points}</strong> {points === 1 ? "vote" : "votes"}
      </div>
    </div>
  );
}

function getFavoriteAnecdote(anecdotes, points) {
  const maxPoints = Math.max(...points);
  const index = points.findIndex((point) => point === maxPoints);
  const anecdote = anecdotes[index];

  return { anecdote, points: maxPoints };
}

export function App() {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(() =>
    Array.from({ length: anecdotes.length }).fill(0)
  );
  const selectedVotes = points[selected];
  const favorite = getFavoriteAnecdote(anecdotes, points);

  const addPoint = () => {
    setPoints((votes) => {
      const copy = [...votes];
      copy[selected] += 1;

      return copy;
    });
  };

  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={addPoint}>
          vote
        </button>
        <button type="button" onClick={nextAnecdote}>
          next anecdote
        </button>
      </div>
      <Display anecdote={anecdotes[selected]} points={selectedVotes} />
      <h2>Today's favorite</h2>
      <Display anecdote={favorite.anecdote} points={favorite.points} />
    </div>
  );
}

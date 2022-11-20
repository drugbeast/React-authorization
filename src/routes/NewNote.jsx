import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/userContext";
import { useState, useEffect } from "react";
import fetchData from "../functions/fetchData";

function NewNote() {
  const context = useUserContext();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [last, setLast] = useState(0);

  useEffect(() => {
    fetchData("notes").then((notes) => {
      setLast(notes[notes.length - 1].id);
    });
  }, []);

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  const date = new Date(Date.now());

  const handleCreateNote = () => {
    const note = {
      id: last + 1,
      userId: context.user.id,
      title: title,
      body: text,
      createdAt: date.toISOString(),
    };

    fetchData("notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {})
      .catch(() => {
        throw new Error();
      });
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <Link
          to="/notes"
          className="border-black border-2 rounded-md px-2 absolute"
        >
          Back
        </Link>
        <div className="flex justify-center w-full">
          <h1 className="text-4xl font-bold mt-[-0.5rem] inline">
            Create new note
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1 mt-10">
        <input
          placeholder="name"
          type="text"
          className="border-black rounded-md border-2 pl-2 py-2 w-full mx-auto"
          onChange={handleSetTitle}
        ></input>
        <input
          placeholder="note text..."
          className="border-black rounded-md border-2 pl-2 pb-32 w-full mx-auto"
          type="text"
          onChange={handleSetText}
        ></input>
        <div className="flex justify-center">
          <Link
            className="border-black border-2 text-lg rounded-md p-2 mt-20 mb-6 bg-black text-white w-40 text-center"
            to="/notes"
            onClick={handleCreateNote}
          >
            Create
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewNote;

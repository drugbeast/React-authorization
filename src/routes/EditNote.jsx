import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import fetchData from "../functions/fetchData";

function EditNote() {
  const location = useLocation();
  const data = location.state;

  const [title, setTitle] = useState(data.title);
  const [text, setText] = useState(data.body);

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  const handleEditNote = () => {
    const note = {
      id: data.id,
      userId: data.userId,
      title: title,
      body: text,
      createdAt: data.createdAt,
    };

    fetchData(`notes/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(note),
      headers: {
        Accept: "application/json",
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
          <h1 className="text-4xl font-bold mt-[-0.5rem] inline">Edit note</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1 mt-10">
        <input
          placeholder="name"
          type="text"
          className="border-black rounded-md border-2 pl-2 py-2 w-full mx-auto"
          onChange={handleSetTitle}
          value={title}
        ></input>
        <input
          placeholder="note text..."
          className="border-black rounded-md border-2 pl-2 pb-32 w-full mx-auto"
          type="text"
          onChange={handleSetText}
          value={text}
        ></input>
        <div className="flex justify-center">
          <Link
            className="border-black border-2 text-lg rounded-md p-2 mt-20 mb-6 bg-black text-white w-40 text-center"
            to="/notes"
            onClick={handleEditNote}
          >
            Save
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditNote;

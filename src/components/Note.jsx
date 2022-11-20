import { useUserContext } from "./userContext";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import editImg from "../images/editImg.png";
import deleteImg from "../images/delete.png";
import fetchData from "../functions/fetchData";

function Note() {
  const UserContext = useUserContext();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useMemo(() => {
    fetchData(`notes?userId=${UserContext.user.id}`)
      .then((notes) => {
        setNotes(notes);
      })
      .catch(() => {
        throw new Error();
      });
  }, [UserContext.user.id]);

  return (
    <div className="flex gap-4 flex-wrap mt-12 mb-10">
      {notes.map((note) => {
        return (
          <div className="border-black border-2 rounded-md pr-3 w-full flex justify-between">
            <Link
              key={note.id}
              to={`/notes/${note.id}`}
              state={{
                id: note.id,
                userId: note.userId,
                title: note.title,
                body: note.body,
                createdAt: note.createdAt,
              }}
              className="w-[90%] p-3"
            >
              <div>
                <h1 className="text-lg font-medium pl-2 inline">
                  {note.title}
                </h1>
                <p className="inline font-light ml-3">
                  {note.createdAt.slice(0, 10).replace(/(-)/gi, ".")}
                </p>
              </div>
            </Link>

            <div className="inline pr-2 pt-3">
              <Link
                to={`/notes/${note.id}/edit`}
                state={{
                  id: note.id,
                  userId: note.userId,
                  title: note.title,
                  body: note.body,
                  createdAt: note.createdAt,
                }}
              >
                <img src={editImg} className="w-[24px] inline mb-1 mr-4" />
              </Link>
              <button
                onClick={() => {
                  fetchData(`notes/${note.id}`, {
                    method: "DELETE",
                  }).then(() => {});
                  navigate(0);
                }}
              >
                <img src={deleteImg} className="w-[24px] inline mb-1" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Note;

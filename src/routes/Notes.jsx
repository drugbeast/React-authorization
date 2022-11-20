import Note from "../components/Note";
import { Link } from "react-router-dom";

function Notes() {
  return (
    <div>
      <h1 className="text-center text-4xl mb-6 font-bold mt-10 mb-12">Notes</h1>
      <div className="flex justify-center">
        <Link
          className="border-black border-2 text-lg rounded-md p-2 mt-0 mb-6 bg-black text-white"
          to="/notes/new"
        >
          Add new note
        </Link>
      </div>
      <Note />
    </div>
  );
}

export default Notes;

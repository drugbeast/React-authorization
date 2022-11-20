import { Link, useLocation, useNavigate } from "react-router-dom";
import editImg from "../images/editImg.png";
import deleteImg from "../images/delete.png";
import fetchData from "../functions/fetchData";

function WatchNote() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

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
            {data.title}
          </h1>
        </div>
        <div className="inline pr-2 flex">
          <Link
            to={`/notes/${data.id}/edit`}
            state={{
              id: data.id,
              userId: data.userId,
              title: data.title,
              body: data.body,
              createdAt: data.createdAt,
            }}
          >
            <img src={editImg} className="w-[24px] inline mb-1 mr-4" />
          </Link>
          <button
            onClick={() => {
              fetchData(`notes/${data.id}`, {
                method: "DELETE",
              }).then(() => {});
              navigate("/notes");
            }}
          >
            <img src={deleteImg} className="w-[24px] inline mb-1" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1 mt-10">
        <div className="border-black rounded-md border-2 pl-2 pb-32 w-full mx-auto">
          {data.body}
        </div>
      </div>
    </div>
  );
}

export default WatchNote;

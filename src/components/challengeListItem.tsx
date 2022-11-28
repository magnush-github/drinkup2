import React, { useState } from "react";
import { IChallenge } from "../types/types";
import PropTypes from "prop-types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
interface IProps {
  challenge: IChallenge;
  deleteChallenge: (id: number) => void;
  editChallenge: (challenge: IChallenge) => void;
}
const ChallengeListItem = (props: IProps) => {
  const { challenge, deleteChallenge, editChallenge } = props;
  const [editing, setEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [description, setDescription] = useState(challenge.description);
  const handleEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setEditing(false);
    setShowOptions(false);
    editChallenge({ ...challenge, description });
  };

  return (
    <li className="flex mt-2 font-semibold justify-between" key={challenge.id}>
      {editing ? (
        <form
          onSubmit={handleEdit}
          className="w-full flex justify-between items-center"
        >
          <textarea
            autoFocus
            className="p-1 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="w-1/5 underline text-right">Save</button>
        </form>
      ) : (
        <>
          <p
            className="max-w-[80%]"
            id={challenge.id.toString()}
            onClick={() => setShowOptions(!showOptions)}
          >
            {challenge.description}
          </p>
          {showOptions && (
            <div className="flex gap-4 items-center">
              <span onClick={() => setEditing(true)} className="cursor-pointer">
                <AiFillEdit />
              </span>
              <span
                onClick={() => deleteChallenge(challenge.id)}
                className="cursor-pointer text-red-600 text-lg"
              >
                <AiFillDelete />
              </span>
            </div>
          )}
        </>
      )}
    </li>
  );
};
ChallengeListItem.propTypes = {
  challenge: PropTypes.object,
  deleteChallenge: PropTypes.func,
  editChallenge: PropTypes.func,
};
export default ChallengeListItem;

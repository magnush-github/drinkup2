import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
/* interface IProps {
  challenge: string;
  deleteChallenge: (id: number) => void;
  editChallenge: (challenge: string) => void;
} */
const ChallengeListItem = (props: any) => {
  const { challenge, deleteChallenge, editChallenge, index } = props;
  const [editing, setEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [description, setDescription] = useState(challenge);
  const handleEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setEditing(false);
    setShowOptions(false);
    editChallenge(index, description);
  };

  return (
    <li className="flex mt-4 font-semibold justify-between" key={challenge}>
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
            className="max-w-[80%] cursor-pointer"
            id={challenge}
            onClick={() => setShowOptions(!showOptions)}
          >
            {challenge}
          </p>
          {showOptions && (
            <div className="flex gap-4 items-center">
              <span
                onClick={() => setEditing(true)}
                className="cursor-pointer"
                aria-label="edit challenge"
              >
                <AiFillEdit />
              </span>
              <span
                className="cursor-pointer text-red-600 text-lg"
                aria-label="delete challenge"
                onClick={() => deleteChallenge(index)}
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
  challenge: PropTypes.string,
  deleteChallenge: PropTypes.func,
  editChallenge: PropTypes.func,
  index: PropTypes.number,
};
export default ChallengeListItem;

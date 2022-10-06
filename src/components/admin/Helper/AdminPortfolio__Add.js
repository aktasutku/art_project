import React, { useState, useEffect } from "react";
//MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
// random id generator
import { v4 as uuidv4 } from "uuid";
//Firebase
import { addDoc } from "firebase/firestore/lite";
import { portfolioItemsCol, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AdminPortfolio__Add = ({ setClose }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // VARIABLES
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [imgURL, setImgURL] = useState();
  const [progress, setProgress] = useState();
  const [uploaded, setUploaded] = useState("");

  //ADD-FIREBASE COLLECTION + STORAGE IMG
  const handleAdd = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `portfolioItems/${image.name + uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    {
      title != "" &&
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Get ImageURL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImgURL(downloadURL);
              // Add new collection document to FIREBASE
              addDoc(portfolioItemsCol, {
                img: downloadURL,
                title: title,
              })
                .then(() => {
                  setUploaded("Succesfully Added");
                })
                .catch((err) => console.log(err));
              setTitle("");
            });
          }
        );
    }
  };
  // Clear FORM
  const handleCleanForm = (e) => {
    e.preventDefault();
    setImage("");
    setTitle("");
    setImgURL("");
    setProgress("");
    setUploaded("");
  };

  return (
    <div className="adminAddDeleteEdit">
      <div
        className="adminAddDeleteEdit__close"
        onClick={() => setClose(false)}
      >
        <CloseSharpIcon />
      </div>
      <div className="adminAddDeleteEdit__img">
        <img src={imgURL} />
      </div>
      <form className="adminAddDeleteEdit__form" onSubmit={(e) => handleAdd(e)}>
        <p>Add Mode</p>
        <div>
          <p>Select Img : </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            style={{ width: "190px" }}
          />
          {progress && (
            <p className="adminAddDeleteEdit__success">
              img status : {progress} % uploaded
              <DoneSharpIcon sx={{ color: "green" }} />
            </p>
          )}
        </div>
        <div>
          <p>Set Title</p>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            placeholder="Title"
          />
          {uploaded && (
            <p className="adminAddDeleteEdit__success">
              {uploaded} <DoneSharpIcon sx={{ color: "green" }} />
            </p>
          )}
        </div>
        <div className="adminAddDeleteEdit__buttons adminflexRow">
          {!uploaded && <button type="submit">Add</button>}
          <button onClick={handleCleanForm}>Clear Form</button>
        </div>
      </form>
    </div>
  );
};

export default AdminPortfolio__Add;

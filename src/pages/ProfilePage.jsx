import { useContext, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { ActualNameContext } from "../components/ActualNameProvider";
import { AuthContext } from "../components/AuthProvider";


export default function ProfilePage() {
  const { actualName } = useContext(ActualNameContext)
  const { username } = useContext(AuthContext);

  //create 2 more useState variable to receive username and image
  const [isEditMode, setIsEditMode] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null)


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  function handleEditProfile() {

    const imageRef = ref(storage, "profileImages/" + image.name);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((downloadURL) => {
            setUrl(downloadURL);
            console.log("Image URL set:", downloadURL);
          })
          .catch((error) => {
            console.error("Error getting the image URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading the image:", error);
      })

    //write your function to handle submit, you need to create a new asyncThunk to send data to neon database
    //you can follow the youtube video you showed me too, means make this as async function
    //then convert the image file to URL within this function so can immediately set the image state

    setIsEditMode(false); //This is just to make it return back to showing just username

  }

  return (
    <>
      <div style={{ height: '2200px', background: 'linear-gradient(#051923, #003554 )' }}>
        <h2 className="mt-5 mb-3 mx-4  text-light ">User Profile</h2>
        <div style={{ border: "1px solid black" }}>
          <Row className="mx-4" style={{ background: '#adb5bd', borderRadius: '20px' }}>
            <Col sm={3}>
              <Image
                src={url ? url : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                className="ms-5 my-5"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "2px solid black"
                }}
                roundedCircle />
            </Col>
            <Col sm={9} className="mt-5 pt-3">
              <h3>{username}</h3>
              <br />
              {isEditMode ? (
                <>
                  <Form onSubmit={handleEditProfile}>
                    <Row className="mb-3">
                      <Col sm={8}>
                        <Form.Group>
                          <Form.Label>New Profile Picture (200x200)</Form.Label>
                          <Form.Control
                            style={{ width: "300px" }}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="me-5"
                      variant="warning"
                      type="submit">Submit</Button>
                    <Button variant="outline-secondary" onClick={() => setIsEditMode(!isEditMode)}>Back</Button>
                  </Form>
                </>

              ) : (
                <>
                  {/* should change <h4> tag below to retrieve user actual_username from database */}
                  <h4 className="mb-5">{actualName}</h4>
                  <Button variant="outline-secondary" onClick={() => setIsEditMode(!isEditMode)}>Edit Profile</Button>
                </>
              )}

            </Col>
          </Row>
        </div>
      </div>

    </>
  )
}

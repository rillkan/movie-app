import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

export default function ProfilePage() {

  //create 2 more useState variable to receive username and image
  const [isEditMode, setIsEditMode] = useState(false);

  function handleEditProfile() {

    //write your function to handle submit, you need to create a new asyncThunk to send data to neon database
    //you can follow the youtube video you showed me too, means make this as async function
    //then convert the image file to URL within this function so can immediately set the image state

    setIsEditMode(false); //This is just to make it return back to showing just username

  }

  return (
    <>
      <Container className="mt-5">
        <h2 className="mt-5 mb-3">User Profile</h2>
        <div style={{ border: "1px solid black" }}>
          <Row>
            <Col sm={3}>
              <Image
                //src i hardcode, should retrieve the firbase storage URL from your database
                src="https://firebasestorage.googleapis.com/v0/b/tadel-app.appspot.com/o/tasks%2Fdepositphotos_137014128-stock-illustration-user-profile-icon.jpg?alt=media&token=f0c021cc-33b8-437f-a624-49eb486788b8"
                className="ms-5 my-5"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "2px solid black"
                }}
                roundedCircle />
            </Col>
            <Col sm={9} className="mt-5 pt-3">
              {/* Should change <h3> tag below to retrieve user email from database */}
              <h3>User Email Address</h3>
              <br />
              {isEditMode ? (
                <>
                  <Form onSubmit={handleEditProfile}>
                    <Row className="mb-3">
                      <Col sm={4}>
                        <Form.Group>
                          <Form.Label>New Username</Form.Label>
                          <Form.Control
                            type="text"
                            style={{ width: "300px" }}
                          //add your onChange
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={8}>
                        <Form.Group>
                          <Form.Label>New Profile Picture</Form.Label>
                          <Form.Control
                            style={{ width: "300px" }}
                            type="file"
                            accept="image/*"
                          //add your onChange
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
                  <h4 className="mb-5">actual_username</h4>
                  <Button variant="outline-secondary" onClick={() => setIsEditMode(!isEditMode)}>Edit Profile</Button>
                </>
              )}

            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}

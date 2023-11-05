import { Container, Nav, Navbar } from "react-bootstrap"

export const FacultyMenu=()=>{
    const logged=JSON.parse(sessionStorage.getItem("person"))
    return(
        <>
               <div>
               <img src=
"https://mec.edu.in/wp-content/uploads/2021/02/main-logo.png"
             className="icn menuicn"
             id="menuicn"
             alt="menu-icon"/> 
 
 <div className="logosec">
 {/* <a className="demo" href="/generate-pdf"><h1>test</h1></a> */}
  
         <div className="logo"> 
         Name : {
         logged.faculty_name
         } 
            </div>
            </div>
            <div style={{color :'#3236a8',fontSize:'27px',fontWeight:'bold'}}>
         ID: {logged.faculty_id}</div> 

     
     
     <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="faculty" />
                    <Navbar.Collapse id="faculty">
                        <Nav className="ms-auto">
                            <div>
                               
                            </div>

                            <button className="me-2 btn btn-outline-danger" onClick={()=>{
                                sessionStorage.removeItem("person")
                                window.location.assign("/")
                            }}>
                                Logout
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </div>
        
           
        </>
    )
}
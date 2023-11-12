import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    const footerStyle = {
      background: 'white',
      display: 'flex',
      justifyContent: 'flex-end', // Add this line to align the text to the right
      alignItems: 'center', // This ensures the content is centered vertically
      height: '30px',
      width: '100%',
      position: 'fixed',
      bottom: 0,
      paddingRight: '16%'
    };

    const paragraphStyle = {
      margin: 0,
      textAlign: 'right', // This will align the text to the right
      fontSize: '12px',
    };

    return (
      <>
        <footer className="" style={footerStyle}>
          <Container fluid>
            <nav>
              <p className="" style={paragraphStyle}>
                <>© 2022 {"  "}</>
                <a href="https://www.linkedin.com/in/bartolomeus-delphito/">phitonthel x giovannyptr</a>
              </p>
              {/* <p className="col-2"></p> */}
            </nav>
          </Container>
        </footer>
      </>
    );
  }
}

// class Footer extends Component {
//   render() {
//     return (
//       <footer className="footer px-0 px-lg-3">
//         <Container fluid>
//           <nav>
//             <ul className="footer-menu">
//             </ul>
//             <p className="copyright text-center">
//               © 2022 {" "}
//               <a href="">phitonthel x giovannyptr</a>
//             </p>
//           </nav>
//         </Container>
//       </footer>
//     );
//   }
// }

export default Footer;

import React from 'react'
import "../styles/footer.css"
function Footer() {
  return (
<footer className="footer">
  <hr />
  
      <div className="sb_footer">
        <div className="sb_footer-links">
          <div className="sb_footer-links-div">
            <h4>FAQ</h4>
                <a href="/em">
                     <p>gift cards</p>
                </a>
                <a href="/em">
                     <p>Payment options</p>
                </a>
                <a href="/em">
                    <p>coustomer support</p>
                </a>
                <a href="/em">
                    <p>become a seller</p>
                </a>
          </div>
         
          <div className="sb_footer-links-div">
            <h4>CONTACT US</h4>
                <a href="/em">
                     <p>phone :- 1234567890</p>
                </a>
                <a href="/em">
                     <p>Email :- example@email.com</p>
                </a>
          </div>

          <div className="sb_footer-links-div sl">
            <h4>follow us</h4>
                <a href="/em">
                      <i className="fab fa-instagram" style={{ color: 'black' }}></i>
                </a>
                <a href="/em">
                      <i className="fab fa-twitter" style={{ color: 'black' }}></i>
                </a>
                <a href="/em">
                     <i className="fab fa-facebook" style={{ color: 'black' }}></i>
                </a>
          </div>
          
        </div>
      </div>
      <hr />
           <div className='sb_footer_below'>
               <div className='sb_footer-cp'>
                   <h4>copyright@2024</h4>
               </div>
           </div>
    </footer>
  )
}

export default Footer
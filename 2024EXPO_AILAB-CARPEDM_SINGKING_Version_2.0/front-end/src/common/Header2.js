import './Header2.css';

function Header2() {
  return (
    <div className="header2">
        <div id='back_btn' style={{cursor: "pointer"}}  onClick={() => window.history.back()}>
            <img src='./img/header_icon/back.png' alt='back_btn'/>
        </div>
    </div>
  );
}

export default Header2;
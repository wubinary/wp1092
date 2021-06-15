import "./Header.css";


export default function Header() {
    const onStatsClick = () => {
        window.location = "/";
    }
    const onUploadClick = () => {
        window.location = "/upload";
    }
    return (
        <div className="Header">
            <div onClick={onStatsClick} className="slogan">
                確診個案追蹤系統
            </div>
            <div className="control">
                <div className= "button" onClick={onStatsClick}> 統計表 </div>
                <div className= "button" onClick={onUploadClick}> 上傳 </div>
            </div>
        </div>
    );
};
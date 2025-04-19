import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

function Header(props) {
    const userContext = useContext(UserContext);
    
    // Custom button component with hover functionality
    const NavButton = ({ to, color, hoverColor, children }) => {
        const [isHovered, setIsHovered] = useState(false);
        
        const baseStyle = {
            padding: "8px 16px",
            borderRadius: "4px",
            textDecoration: "none",
            color: "black",
            cursor: "pointer",
            backgroundColor: isHovered ? hoverColor : color,
            transition: "background-color 0.3s ease"
        };
        
        return (
            <Link 
                to={to}
                style={baseStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </Link>
        );
    };
    
    return (
        <header className="bg-white shadow-sm p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">{props.title}</h1>
                
                <nav>
                    <div className="flex flex-wrap gap-2">
                        <NavButton to="/" color="#fff" hoverColor="#dee9fa">
                            Home
                        </NavButton>
                        
                        {userContext.user ? (
                            <>
                                <NavButton to="/publish" color="#fff" hoverColor="#dee9fa">
                                    Publish
                                </NavButton>
                                <NavButton to="/profile" color="#fff" hoverColor="#dee9fa">
                                    Profile
                                </NavButton>
                                <NavButton to="/logout" color="#fff" hoverColor="#dee9fa">
                                    Logout
                                </NavButton>
                            </>
                        ) : (
                            <>
                                <NavButton to="/login" color="#fff" hoverColor="#dee9fa">
                                    Login
                                </NavButton>
                                <NavButton to="/register" color="#fff" hoverColor="#dee9fa">
                                    Register
                                </NavButton>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
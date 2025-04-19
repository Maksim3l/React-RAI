import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import StyledButton from './StyledButton';

function Header(props) {
    const userContext = useContext(UserContext);
    
    
    return (
        <header className="bg-white shadow-sm p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">{props.title}</h1>
                
                <nav>
                    <div className="flex flex-wrap gap-2">
                        <StyledButton to="/" color="#fff" hoverColor="#dee9fa">
                            Home
                        </StyledButton>
                        
                        {userContext.user ? (
                            <>
                                <StyledButton to="/publish" color="#fff" hoverColor="#dee9fa">
                                    Publish
                                </StyledButton>
                                <StyledButton to="/profile" color="#fff" hoverColor="#dee9fa">
                                    Profile
                                </StyledButton>
                                <StyledButton to="/logout" color="#fff" hoverColor="#dee9fa">
                                    Logout
                                </StyledButton>
                            </>
                        ) : (
                            <>
                                <StyledButton to="/login" color="#fff" hoverColor="#dee9fa">
                                    Login
                                </StyledButton>
                                <StyledButton to="/register" color="#fff" hoverColor="#dee9fa">
                                    Register
                                </StyledButton>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
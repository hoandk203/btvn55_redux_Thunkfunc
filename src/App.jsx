
import './App.css'
import {MyForm, MyList, Search} from "./components";
import Container from '@mui/material/Container';

function App() {
    
    return (
        <>
            <Container style={{alignItems: "center", display: "flex", flexDirection: "column"}} maxWidth="md">
                <Search/>
                <MyForm/>
                <MyList/>
            </Container>
        </>
    )
}

export default App

import './App.css';
import {useState, useEffect} from 'react'
import Axios from 'axios'

function App() {
    const [name, setName] = useState("");
    const [size, setSize] = useState(1);
    const [listOfSquares, setListOfSquares] = useState([]);

    const addSquare = () => {
        Axios.post('http://localhost:3001/addsquare', {name: name, size: size}).then(response => setListOfSquares(
            [...listOfSquares, {_id: response.data._id, name: name, size: size}
    ]))
    };

    const updateSquareSize = (id) => {
        const newSize = prompt("Enter new size:");
        Axios.put('http://localhost:3001/updatesquaresize', {size: newSize, id: id}).then(() => {
            setListOfSquares(listOfSquares.map(value => {
                return id === value._id ? {_id: id, name: value.name, size: newSize} : value;
            }));

        });
    };

    const deleteSquare = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
            setListOfSquares(listOfSquares.filter(value => {
                return value._id !== id;
            }))
        })
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/read').then(response => {
            setListOfSquares(response.data)
        })
    }, []);

    return (
        <div className="App">
            <div className="inputs">
                <input type="text" placeholder="Square name..." onChange={(event => {
                    setName(event.target.value)
                })}/>
                <input type="number" placeholder="Square size..." onChange={(event => {
                    setSize(event.target.value)
                })}/>
                <button onClick={addSquare}>Stack square</button>
            </div>

            {listOfSquares.map((val) => {
                return <div>{val.name} {val.size}
                    <button onClick={() => {
                        updateSquareSize(val._id)
                    }}>Edit
                    </button>
                    <button onClick={() => {
                        deleteSquare(val._id)
                    }}>Remove
                    </button>
                </div>
            })}

        </div>
    );
}

export default App;

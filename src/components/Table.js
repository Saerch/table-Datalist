
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import { FcPrevious,FcNext} from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Table.css';

const renderData = (data) =>{
    const {first_name,last_name,state,age,city,web,zip,company_name,id,email} = data;

return(
    <>{
        data.length? data.map((data,index) =>{
            const {first_name,last_name,state,age,city,web,zip,company_name,id,email} = data;
            return(
                <tbody>
                     <tr key={index}>
                                <td><Link className='Link' to={`/users/${id}`}>{first_name}</Link></td>
                                <td>{last_name}</td>
                                <td>{age}</td>
                                <td>{email}</td>
                                <td><a href={web} target='_blank' rel="noopener" style={{color:"hsl(200deg 100% 70%)",textDecoration:"none"}}>{web}</a></td>
                                </tr>
                </tbody>
            )
        }):
        <tr>
             <td><Link className='Link' to={`/users/${id}`}>{first_name}</Link></td>
                        <td>{last_name}</td>
                        <td>{age}</td>
                        <td>{email}</td>
                        <td><a href={web} target='_blank' rel="noopener" style={{ color: "hsl(20deg 100% 70%)", textDecoration: "none" }}>{web}</a></td>
        </tr>
    }
    </>
)

}


function Pagination() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([])

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(10);

    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    const pages = [];
    const dataN=searchData.length?searchData.length:data.length;
    for (let i = 1; i <= Math.ceil( dataN/ itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage == number ? "active" : null}
                >
                    {number}
                </li>
            );
        } else {
            return null;
        }
    });
    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit == 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }
    const dataUrl = "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
    useEffect(() => {
        fetch(dataUrl).then(response => response.json()).then(data => {
            setData(data)
        })
    }, [])
    const [text, setText] = useState("");
    const onSubmit = event => {
        event.preventDefault();
        if (text === "") {
            toast("Please enter something!");
        } else {
            // alert(text);
            console.log(text)
            // setText("");
        }
    };

    const onChange = event => setText(event.target.value);
    useEffect(() => {
        const searchResult = data && data.filter(dt => dt.first_name.toLowerCase().includes(text.toLowerCase()) || dt.last_name.toLowerCase().includes(text.toLowerCase()))
        setSearchData(searchResult)
    }, [text])

    const ascendingF = () => {
        data && setData([...data].sort((a, b) => a.first_name.toLowerCase() > b.first_name.toLowerCase() ? -1 : 1))
    }
    const descendingF = () => {
        data && setData([...data].sort((a, b) => a.first_name.toLowerCase() < b.first_name.toLowerCase() ? -1 : 1))
    }


    const ascendingL = () => {
        data && setData([...data].sort((a, b) => a.last_name.toLowerCase() > b.last_name.toLowerCase() ? -1 : 1))
    }
    const descendingL = () => {
        data && setData([...data].sort((a, b) => a.last_name.toLowerCase() < b.last_name.toLowerCase() ? -1 : 1))
    }

    // age


    const ascendingA = () => {
        data && setData([...data].sort((a, b) => a.age - b.age))
    }
    const descendingA = () => {
        data && setData([...data].sort((a, b) => b.age - a.age))
    }


    // email


    const ascendingE = () => {
        data && setData([...data].sort((a, b) => a.email > b.email ? -1 : 1))
    }
    const descendingE = () => {
        data && setData([...data].sort((a, b) => a.email < b.email ? -1 : 1))
    }


    // web 
    const ascendingW = () => {
        data && setData([...data].sort((a, b) => a.web.toLowerCase() > b.web.toLowerCase() ? -1 : 1))
    }
    const descendingW = () => {
        data && setData([...data].sort((a, b) => a.web.toLowerCase() < b.web.toLowerCase() ? -1 : 1))
    }


    return (
        <>
            <div className='table'>
                <h2 style={{ color: "#0000009c" }}>Users</h2>
                <div>
                    <form onSubmit={onSubmit} className='user-search'>
                        <input
                            type="text"
                            name="text"
                            placeholder="Search by first or last name"
                            value={text}
                            onChange={onChange}

                        />
                        <ToastContainer
                            position="top-center"
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        <button type="submit" style={{ backgroundColor: '#fff' }}>
                            <AiOutlineSearch />
                        </button>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr className='tr'>
                            <th > <div className='th-sorting'>First Name <div className='th-sort-icon'><AiOutlineUp onClick={descendingF} className='srt-icon' /><AiOutlineDown onClick={ascendingF} className='srt-icon' /></div></div> </th>


                            <th > <div className='th-sorting'>Last Name <div className='th-sort-icon'><AiOutlineUp onClick={descendingL} className='srt-icon' /><AiOutlineDown onClick={ascendingL} className='srt-icon' /></div></div> </th>


                            <th > <div className='th-sorting'>Age <div className='th-sort-icon'><AiOutlineUp onClick={descendingA} className='srt-icon' /><AiOutlineDown onClick={ascendingA} className='srt-icon' /></div></div> </th>


                            <th > <div className='th-sorting'>Email <div className='th-sort-icon'><AiOutlineUp onClick={descendingE} className='srt-icon' /><AiOutlineDown onClick={ascendingE} className='srt-icon' /></div></div> </th>


                            <th > <div className='th-sorting'>Website <div className='th-sort-icon'><AiOutlineUp onClick={descendingW} className='srt-icon' /><AiOutlineDown onClick={ascendingW} className='srt-icon' /></div></div> </th>
                        </tr>
                    </thead>

                    {
                        text !== "" ? searchData.length ? searchData.slice(0,10).map((data, index) => {
                            return (
                                <tbody key={index}>
                                    {renderData(data)}
                                </tbody>
                            )
                        }) : <div>
                            <h1 style={{ textAlign: 'center', marginTop: "200px", color: "#0000009c" }}>there's no available data</h1>
                        </div> : renderData(currentItems)
                    }

                </table>
            </div>

            <ul className="pageNumbers">
                <li>
                    <button
                        onClick={handlePrevbtn}
                        disabled={currentPage == pages[0] ? true : false}
                    >
                        <FcPrevious/>
                    </button>
                </li>
                
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}

                <li>
                    <button
                        onClick={handleNextbtn}
                        disabled={currentPage == pages[pages.length - 1] ? true : false}
                    >
                        <FcNext/>
                    </button>
                </li>
            </ul>

        </>
    );
}

export default Pagination;
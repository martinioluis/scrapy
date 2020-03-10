import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import './TableItem.css';

const TableItem = (data) => {
    const [colNames, setColNames] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/names')
            .then(res => res.json())
            .then(data => setColNames(data))
    }, []);

    // Delete double names
    //const names = colNames.reduce((unique, item) => unique.includes(item.COLUMN_NAME) ? unique : [...unique, item.COLUMN_NAME], "");
    const names = ['Title', 'Adress', 'Postal Code', 'City', 'Distance (Km)', 'Web Site', 'Price (€)'];

    return (
        <div className="TableItem">
            <h1>Table</h1>
            <Table>
                <thead>
                    <tr>
                        {names.map(item => <th>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.data.map(item =>
                        <tr>
                            <th>{item.title}</th>
                            <th>{item.adress}</th>
                            <th>{item.postalCode}</th>
                            <th>{item.city}</th>
                            <th>{item.distance}</th>
                            <th><a href={item.url}>Url</a></th>
                            <th>{item.price}</th>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default TableItem;
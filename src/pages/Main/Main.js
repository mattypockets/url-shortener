import React, { Component } from 'react';
import { Form, Table } from 'react-bootstrap';
import './Main.css';

class Main extends Component {

    state = {
        urls: [
            //{id: 1, longUrl:"www.foundrymakes.com/work/carmichael-lynch", shortUrl:"localhost:3000/t/eP9Q2", hits: 0}
        ]
    }



    render() {
        return(

            // Header
            // URL Entry
            // Table
            <Table>
                <thead>
                    <tr>
                        <th>Original URL</th>
                        <th>Tiny URL</th>
                        <th>Hit Count</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.urls.map(url => (
                        <tr>
                            <td>{url.longUrl}</td>
                            <td>{url.shortUrl}</td>
                            <td>{url.hits}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}
import React from 'react'

const TableBody = (props) => {
    const { title, author, isbn } = props;
    return (
        <tbody>
            <tr>
                <td>{title}</td>
                <td>{author}</td>
                <td>{isbn}</td>
            </tr>
        </tbody>
    )
}

export default TableBody

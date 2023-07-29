import React from 'react'
import CustomNavbar from '../../Components/Navbar/Navbar'
import ExcelToHtmlTable from '../../Components/ExcelToTab/ExcelToHtmlTable'

const RollList = () => {
    return (
        <div>
            <CustomNavbar/>
            <div style={{marginTop: "100px"}}>
                <h1>Excel to HTML Table Converter</h1>
                <ExcelToHtmlTable/>
            </div>
        </div>
    )
}

export default RollList
import React, { useState } from 'react'
import CustomNavbar from '../../Components/Navbar/Navbar'
import Progress1 from '../../Components/progress_bar/Progress1';
import "./ReportPage.scss"
import img from "../../assets/dummy.png"
import FileDownload from "js-file-download"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ReportPage = ({ user }) => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    const download = (e) => {
        e.preventDefault()
        axios({
            url: "http://localhost:8080/result",
            method: "GET",
            responseType: "blob",
        }).then((res) => {
            console.log(res);
            FileDownload(res.data, "Report.xlsx");
        })
    }

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile1 = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        axios.post("http://localhost:8080/uploads", formData, {
            headers: { 'Content-Type': 'miltipart/form-data' },
            onUploadProgress: progressEvent => {
                if (file && !checked1) {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
                    setTimeout(() => setUploadPercentage(0), 2500);
                    setChecked1(old => !old);
                    alert("Confirm Upload : File Name-" + fileName + " ?");
                }
            }
        })
            .then(res => {
                alert("File not selected");
                if (res.data.success === 1) {
                    console.log("File uploaded successfully");
                }
            })
    }

    const uploadFile2 = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        axios.post("http://localhost:8080/uploads", formData, {
            headers: { 'Content-Type': 'miltipart/form-data' },
            onUploadProgress: progressEvent => {
                if (file && !checked2) {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
                    setTimeout(() => setUploadPercentage(0), 2500);
                    setChecked2(old => !old);
                    alert("Confirm Upload : File Name-" + fileName + " ?");
                }
            }
        })
            .then(res => { // then print response status
                alert("File not selected");
                if (res.data.success === 1) {
                    console.log("File uploaded successfully");
                }

            })
    }


    const uploadFile3 = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        axios.post("http://localhost:8080/uploads", formData, {
            headers: { 'Content-Type': 'miltipart/form-data' },
            onUploadProgress: progressEvent => {
                if (file && !checked3) {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
                    setTimeout(() => setUploadPercentage(0), 2500);
                    setChecked3(old => !old);
                    alert("Confirm Upload : File Name-" + fileName + " ?");
                }
            }
        })
            .then(res => { // then print response status
                alert("File not selected");
                if (res.data.success === 1) {
                    console.log("File uploaded successfully");
                }
            })
    }

    var data;
    function SaveAlert() {
        if (checked1 && checked2 && checked3) {
            alert("Confirm: Save Changes ?");
        }
        else {
            toast.error('Need At lease 3 Files!!!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const thresholdChange = (e) => {
        data = e.target.value;
        console.log(data);
        axios.post("http://localhost:8080/threshold", data);
    }
    const handleGenerateReport = async () => {
        if (checked1 && checked2 && checked3) {
            try {
                await axios.post('http://localhost:8080/generateReport')

            } catch (error) {
                console.error('Error generating report:', error);
            }
        }
    };
    const fun = () => {
        return;
    }
    return (
        <>
            <CustomNavbar user={user} />
            <div className='report-page-container'>
                <div className="items">
                    <div className="sub-title">
                        <h2 style={{ padding: "20px" }} className='page-title'>Assesment Data</h2>
                    </div>
                    <div className='tab'>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th className='Check'>Ch</th>
                                    <th className='Sr'>SR NO</th>
                                    <th className='AT'>Assesment Tool</th>
                                    <th className='data'>Add Data</th>
                                    <th className='Template'>Template</th>
                                    <th className='activity'>Activity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input className='checkbox' type="checkbox" onChange={e => { }} checked={checked1} /></td>
                                    <td>1</td>
                                    <td>Multiple Choice Questions</td>
                                    <td><input type='file' onChange={saveFile} accept=".xlsx"></input></td>
                                    <td><a download href={img} className='d-btn'>Download <i className="fa-solid fa-download down-icon"></i></a></td>
                                    <td><button className='Savebtn' onClick={
                                        () => {
                                            uploadFile1();
                                        }}>Upload</button></td>
                                </tr>
                                <tr>
                                    <td><input className='checkbox' type="checkbox" onChange={e => { }} checked={checked2} /></td>
                                    <td>2</td>
                                    <td>Theory Assignment</td>
                                    <td><input type='file' onChange={saveFile} accept=".xlsx"></input></td>
                                    <td><a download href={img} className='d-btn'>Download <i className="fa-solid fa-download down-icon"></i></a></td>
                                    <td><button className='Savebtn' onClick={
                                        () => {
                                            uploadFile2();
                                        }}>Upload</button></td>
                                </tr>
                                <tr>
                                    <td><input className='checkbox' type="checkbox" onChange={e => { }} checked={checked3} /></td>
                                    <td>3</td>
                                    <td>Mid Term Exam</td>
                                    <td><input type='file' onChange={saveFile} accept=".xlsx"></input></td>
                                    <td><a download href={img} className='d-btn'>Download <i className="fa-solid fa-download down-icon"></i></a></td>
                                    <td><button className='Savebtn' onClick={
                                        () => {
                                            uploadFile3();
                                        }}>Upload</button></td>
                                </tr>
                                <tr>
                                    <td><input className='checkbox' type="checkbox" /></td>
                                    <td>4</td>
                                    <td>End Term Exam</td>
                                    <td><input type='file' onChange={saveFile} accept=".xlsx"></input></td>
                                    <td><button className='d-btn'>Download <i className="fa-solid fa-download down-icon"></i></button></td>
                                    <td><button className='Savebtn'>Upload</button></td>
                                </tr>
                                <tr>
                                    <td><input className='checkbox' type="checkbox" /></td>
                                    <td>5</td>
                                    <td>Oral examination</td>
                                    <td><input type='file' onChange={saveFile} accept=".xlsx"></input></td>
                                    <td><button className='d-btn'>Download <i className="fa-solid fa-download down-icon"></i></button></td>
                                    <td><button className='Savebtn'>Upload</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='threshold-div'>
                        <span className='threshold'>Select Threshold</span>
                        <select className='options' name="options" onChange={thresholdChange}>
                            <option value="60">60%</option>
                            <option value="75">75%</option>
                            <option value="80">80%</option>
                            <option value="50">50%</option>
                        </select>
                    </div>
                    <Progress1 percentage={uploadPercentage} />
                    <div className='save-button'>
                        <button className={'new-button'} onClick={(e) => {
                            SaveAlert();
                            handleGenerateReport();
                            (checked1 && checked2 && checked3)
                                ?
                                download(e)
                                :
                                fun();
                        }}>
                            Generate Report
                        </button>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover
                    theme="light"
                />
            </div>
        </>
    )
}

export default ReportPage
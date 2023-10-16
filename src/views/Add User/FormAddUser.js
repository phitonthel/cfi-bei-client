import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function AddUserForm() {
    const [userData, setUserData] = useState({
        nik: "",
        fullname: "",
        email: "",
        password: "",
        level: "",
        directorate: "",
        divisionName: "",
        unitName: "",
        location: "",
        roleName: "",
        positionName: ""
    });

    const directorateOptions = [
        "Direktorat Perdagangan dan Pengaturan Anggota Bursa",
        "Direktorat Pengawasan Transaksi dan Informasi",
        "Direktorat Pengawasan Transaksi dan Kepatuhan",
        "Direktorat Teknologi Informasi dan Manajemen Risiko",
        "Direktorat Penilaian Perusahaan",
        "Direktorat Keuangan dan Sumber Daya Manusia",
        "Direktorat Pengembangan",
        "Direktorat Utama",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        //kirim ke API
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>NIK</Form.Label>
                    <Form.Control type="text" name="nik" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" name="fullname" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" name="level" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Directorate</Form.Label>
                    <Form.Control as="select" name="directorate" onChange={handleChange}>
                        {directorateOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Division Name</Form.Label>
                    <Form.Control type="text" name="divisionName" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Unit Name</Form.Label>
                    <Form.Control type="text" name="unitName" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" name="location" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control type="text" name="roleName" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Position Name</Form.Label>
                    <Form.Control type="text" name="positionName" onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add User
                </Button>
            </Form>
        </Container>
    );
}

export default AddUserForm;

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

    const levelOptions = [
        "Kepala Divisi",
        "Staf",
        "Kepala Unit",
        "Kepala Kantor"
    ]

    const unitOptions = [
        "Pemeriksaan Kepatuhan Anggota Bursa 2",
        "Manajemen Proyek Teknologi Informasi 1",
        "Evaluasi dan Pemantauan Perusahaan Tercatat 1",
        "Sistem Keamanan Teknologi Informasi",
        "Operasional Sumber Daya Manusia",
        "Evaluasi dan Pemantauan Perusahaan Tercatat 2",
        "Pengadaan",
        "Layanan Perdagangan",
        "Manajemen Rilis",
        "Kajian dan Analisis Ekonomi",
        "Analisis Bisnis",
        "Pengembangan Aplikasi",
        "Komunikasi",
        "Akuntansi",
        "Satuan Pemeriksa Teknologi Informasi Internal",
        "Pengelolaan Wilayah 2",
        "Pengelolaan Perkantoran",
        "Pengembangan Organisasi",
        "Business Continuity Management",
        "Operasional Keuangan dan Perpajakan",
        "Pengembangan Produk 2",
        "Operasional Sistem Perdagangan",
        "Pengelolaan Wilayah 1",
        "Anggaran",
        "Pengembangan Sumber Daya Manusia",
        "Pengembangan Produk Syariah",
        "Riset Pasar Modal",
        "Penjualan dan Pemasaran Data",
        "Evaluasi Sarana dan Sistem Pengawasan",
        "Pengembangan Bisnis Data",
        "Kesekretariatan",
        "Pengembangan Infrastruktur",
        "Satuan Pemeriksa Keuangan Internal",
        "Pengembangan Calon Perusahaan Tercatat 2",
        "Perencaaan Strategis dan Manajemen Kinerja",
        "Jaringan dan Dukungan Teknis",
        "Pemeriksaan Kepatuhan Anggota Bursa 3",
        "Layanan Operasional TI(Perdagangan dan Pendukungnya)",
        "Layanan Operasional TI(Bisnis dan Perkantoran)",
        "Pengembangan Literasi dan Inklusi Pasar",
        "Pemeriksaan Sistem Informasi",
        "Treasury",
        "Pemantauan dan Pelaporan Risiko",
        "Pengembangan Calon Perusahaan Tercatat 1",
        "Pengembangan Peraturan dan Layanan Anggota Bursa dan Partisipan",
        "Pengelolaan Data",
        "Relasi Media",
        "Sistem Manajemen",
        "Manajemen Proyek 2",
        "Evaluasi dan Pemantauan Anggota Bursa 1",
        "Pengelolaan Wilayah 3",
        "Pengelolaan Data Efek dan Parameter Perdagangan",
        "Pemeriksaan Transaksi",
        "Evaluasi dan Pemantauan Perusahaan Tercatat 2",
        "Pengelolaan Wilayah 1",
        "Pengelolaan Wilayah 2",
        "Pengembangan Aplikasi",
        "Pemeriksaan Kepatuhan Anggota Bursa 3"
    ];

    const positionName = [
        "Akuntansi",
        "Analisis Bisnis",
        "Anggaran",
        "Asisten Administrasi",
        "Business Continuity Management",
        "Evaluasi Sarana dan Sistem Pengawasan",
        "Evaluasi dan Pemantauan Anggota Bursa 1",
        "Evaluasi dan Pemantauan Anggota Bursa 2",
        "Evaluasi dan Pemantauan Anggota Bursa 3",
        "Evaluasi dan Pemantauan Perusahaan Tercatat 1",
        "Evaluasi dan Pemantauan Perusahaan Tercatat 2",
        "Evaluasi dan Pemantauan Perusahaan Tercatat 3",
        "Expert IT Business Partner dan Inkubasi Inovasi",
        "Expert Layanan dan Pengembangan Perusahaan Tercatat",
        "Expert Manajemen Risiko",
        "Hubungan Institusi",
        "IT Business Partner dan Inkubasi Inovasi",
        "Jaringan dan Dukungan Teknis",
        "Kajian dan Analisis Ekonomi",
        "Kepala Divisi Hukum",
        "Kepala Divisi Kepatuhan Anggota Bursa",
        "Kepala Divisi Layanan Data",
        "Kepala Divisi Operasional TI (Bisnis dan Perkantoran)",
        "Kepala Divisi Pengaturan dan Pemantauan Anggota Bursa dan Partisipan",
        "Kepala Divisi Pengawasan Transaksi",
        "Kepala Divisi Pengembangan Bisnis",
        "Kepala Divisi Penilaian Perusahaan 3",
        "Kepala Divisi Strategi dan Transformasi Digital",
        "Kepala Divisi Sumber Daya Manusia",
        "Kepala Inkubator Jawa Barat",
        "Kepala Kantor Perwakilan Aceh",
        "Kepala Kantor Perwakilan DKI Jakarta",
        "Kepala Kantor Perwakilan Jawa Barat",
        "Kepala Kantor Perwakilan Jawa Tengah 1",
        "Kepala Kantor Perwakilan Maluku",
        "Kepala Kantor Perwakilan Nusa Tenggara Timur",
        "Kepala Kantor Perwakilan Sulawesi Tenggara",
        "Kepala Unit Akuntansi",
        "Kepala Unit Analisis Bisnis",
        "Kepala Unit Business Continuity Management",
        "Kepala Unit Evaluasi Sarana dan Sistem Pengawasan",
        "Kepala Unit Evaluasi dan Pemantauan Anggota Bursa 3",
        "Kepala Unit Evaluasi dan Pemantauan Perusahaan Tercatat 1",
        "Kepala Unit Evaluasi dan Pemantauan Perusahaan Tercatat 2",
        "Kepala Unit Evaluasi dan Pemantauan Perusahaan Tercatat 3",
        "Kepala Unit Hubungan Institusi",
        "Kepala Unit Kajian dan Analisis Ekonomi",
        "Kepala Unit Kesekretariatan",
        "Kepala Unit Layanan Operasional TI (Bisnis dan Perkantoran)",
        "Kepala Unit Manajemen Rilis",
        "Kepala Unit Operasional Keuangan dan Perpajakan",
        "Kepala Unit Pemeriksaan Kepatuhan Anggota Bursa 2",
        "Kepala Unit Pemeriksaan Kepatuhan Anggota Bursa 3",
        "Kepala Unit Pemeriksaan Sistem Informasi",
        "Kepala Unit Pemeriksaan Transaksi",
        "Kepala Unit Pemantauan Perdagangan",
        "Kepala Unit Pemantauan dan Pelaporan Risiko",
        "Kepala Unit Pengadaan",
        "Kepala Unit Pengembangan Bisnis Syariah",
        "Kepala Unit Pengembangan Infrastruktur",
        "Kepala Unit Pengembangan Literasi dan Inklusi Pasar",
        "epala Unit Pengembangan Organisasi",
        "Kepala Unit Pengembangan Produk 1",
        "Kepala Unit Pengembangan Produk 2",
        "Kepala Unit Pengembangan Sumber Daya Manusia",
        "Kepala Unit Pengelolaan Data",
        "Kepala Unit Pengelolaan Data Efek dan Parameter Perdagangan",
        "Kepala Unit Pengelolaan Perkantoran",
        "Kepala Unit Pengelolaan Wilayah 1",
        "Kepala Unit Pengelolaan Wilayah 2",
        "Kepala Unit Pengelolaan Wilayah 3",
        "Kepala Unit Pengembangan Bisnis",
        "Kepala Unit Pengembangan Sumber Daya Manusia",
        "Kepala Unit Peraturan",
        "Kepala Unit Perencanaan dan Manajemen Kinerja",
        "Kepala Unit Perencanaan dan Pengembangan Sistem Informasi",
        "Kepala Unit Perencanaan dan Pengembangan Sistem Informasi",
        "Kepala Unit Perencanaan Strategis dan Manajemen Kinerja",
        "Kepala Unit Riset Pasar Modal",
        "Kepala Unit Sarana dan Prasarana Perkantoran",
        "Kepala Unit Satuan Pemeriksa Keuangan Internal",
        "Kepala Unit Satuan Pemeriksa Teknologi Informasi Internal",
        "Kepala Unit Sekretaris",
        "Kepala Unit Sistem Keamanan Teknologi Informasi",
        "Kepala Unit Sistem Keamanan Teknologi Informasi",
        "Kepala Unit Teknisi",
        "Kepala Unit Treasury",
        "Komunikasi",
        "Layanan Operasional TI (Bisnis dan Perkantoran)",
        "Layanan Umum",
        "Manajemen Proyek 1",
        "Manajemen Proyek 2",
        "Manajemen Proyek Teknologi Informasi 1",
        "Manajemen Proyek Teknologi Informasi 2",
        "Manajemen Rilis",
        "Operasional Keuangan dan Perpajakan - Collection",
        "Operasional Keuangan dan Perpajakan - Kasir",
        "Operasional Sumber Daya Manusia - Employee Relation & Services",
        "Operasional Sumber Daya Manusia - Recruitment & Selection",
        "Operasional Sumber Daya Manusia - Training & Development",
        "Operasional Sistem Perdagangan",
        "Pemantauan Perdagangan",
        "Pemantauan dan Pelaporan Risiko",
        "Pelaporan dan Evaluasi Perdagangan",
        "Pemeriksaan Kepatuhan Anggota Bursa 2",
        "Pengadaan",
        "Pengembangan Aplikasi",
        "Pengembangan Bisnis",
        "Pengembangan Literasi dan Inklusi Pasar",
        "Pengembangan Produk 2",
        "Pengembangan Sumber Daya Manusia",
        "Pengembangan Teknologi Informasi",
        "Pengelolaan Data Efek dan Parameter Perdagangan",
        "Pengelolaan Perkantoran",
        "Pengelolaan Wilayah 2",
        "Pengelolaan Wilayah 3",
        "Peraturan",
        "Perencanaan Strategis dan Manajemen Kinerja",
        "Perkantoran",
        "Relasi Media",
        "Riset Pasar Modal",
        "Sarana dan Prasarana Perkantoran",
        "Satuan Pemeriksa Keuangan Internal",
        "Satuan Pemeriksa Teknologi Informasi Internal",
        "Satuan Pemeriksa Transaksi",
        "Sekretaris",
        "Sistem Keamanan Teknologi Informasi",
        "Sistem Manajemen",
        "Strategi dan Enterprise Architecture TI",
        "Teknisi",
    ]

    const locationOptions = [
        "Aceh",
        "Bali",
        "Banten",
        "Bengkulu",
        "Jakarta",
        "Jambi",
        "Jawa Barat",
        "Jawa Tengah 1",
        "Jawa Tengah 2",
        "Jawa Timur",
        "Kalimantan Selatan",
        "Kepulauan Riau",
        "Lampung",
        "Maluku",
        "Nusa Tenggara Timur",
        "Papua",
        "Riau",
        "Sulawesi Selatan",
        "Sulawesi Tengah",
        "Sulawesi Tenggara",
        "Sulawesi Utara",
        "Sumatera Barat",
        "Sumatera Selatan",
        "Sumatera Utara",
        "Yogyakarta",

    ]


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
                    <Form.Control as="select" name="level" onChange={handleChange}>
                        {levelOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Control>
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
                    <Form.Control as="select" name="unitName" onChange={handleChange}>
                        {unitOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="select" name="location" onChange={handleChange}>
                        {locationOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control type="text" name="roleName" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Position Name</Form.Label>
                    <Form.Control as="select" name="posisitionName" onChange={handleChange}>
                        {positionName.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add User
                </Button>
            </Form>
        </Container>
    );
}

export default AddUserForm;

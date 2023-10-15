<?php
// MySQL bağlantısı
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// POST isteği ile gelen verileri al
$username = $_POST['username'];
$password = $_POST['password'];

// MySQL bağlantısını oluştur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantı kontrolü
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Kullanıcı doğrulaması yap
$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Login successful!";
} else {
    echo "Login failed. Invalid username or password.";
}

$conn->close();
?>

const handleSubmit = (e) => {
  e.preventDefault();

  if (
    email === "chinmaygarglalit@gmail.com" &&
    password === "Admin@123"
  ) {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  } else {
    alert("Invalid email or password");
  }
};
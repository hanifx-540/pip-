async function checkLeak() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const phone = document.getElementById("phone").value.trim();
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim().toLowerCase();
  const resultBox = document.getElementById("result");

  try {
    const res = await fetch("leaked_data_400k.json");
    const data = await res.json();

    const messages = [];

    if (data.emails.includes(email)) {
      messages.push(`❌ Email <b>${email}</b> found in leaked database.`);
    }
    if (data.phones.includes(phone)) {
      messages.push(`❌ Phone number <b>${phone}</b> is leaked.`);
    }
    if (data.usernames.includes(username)) {
      messages.push(`❌ Username <b>${username}</b> is in breach list.`);
    }
    if (data.passwords.includes(password)) {
      messages.push(`❌ Password is weak or leaked.`);
    }

    if (messages.length === 0) {
      messages.push("✅ All inputs appear safe.");
      resultBox.className = "result safe";
    } else {
      resultBox.className = "result leaked";
    }

    resultBox.innerHTML = messages.join("<br>");
    resultBox.style.display = "block";

  } catch (error) {
    resultBox.innerHTML = "❌ Failed to load leak database.";
    resultBox.className = "result leaked";
    resultBox.style.display = "block";
  }
    }

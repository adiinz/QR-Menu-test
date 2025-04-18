    let bill = JSON.parse(localStorage.getItem("guestBill")) || {};

    // Render menu
    const menuDiv = document.getElementById("menuItems");
    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer";
      div.innerHTML = `<h3 class="text-lg font-semibold">${item.name}</h3><p class="text-sm text-gray-500">${item.price} KM</p>`;
      div.onclick = () => addItem(item.name, item.price);
      menuDiv.appendChild(div);
    });

    function updateDisplay() {
      const itemList = document.getElementById("itemList");
      const billTotal = document.getElementById("billTotal");

      itemList.innerHTML = '';
      let total = 0;

      for (let item in bill) {
        const qty = bill[item].quantity;
        const price = bill[item].price;
        const subtotal = qty * price;
        total += subtotal;

        const li = document.createElement("li");
        li.className = "cursor-pointer hover:line-through";
        li.textContent = `${item} x${qty} – ${subtotal} KM`;
        li.onclick = () => removeItem(item);
        itemList.appendChild(li);
      }

      billTotal.textContent = total;
      localStorage.setItem("guestBill", JSON.stringify(bill));
    }

    function addItem(name, price) {
      if (bill[name]) {
        bill[name].quantity++;
      } else {
        bill[name] = { price: price, quantity: 1 };
      }
      updateDisplay();
    }

    function removeItem(name) {
      if (bill[name]) {
        bill[name].quantity--;
        if (bill[name].quantity <= 0) {
          delete bill[name];
        }
      }
      updateDisplay();
    }

    updateDisplay();

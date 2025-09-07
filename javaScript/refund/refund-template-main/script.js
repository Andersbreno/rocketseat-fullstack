// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// Captura o evento input para formatar valor
amount.oninput = () => {
    // Obtém o valor atual e remove não numéricos
    let value  = amount.value.replace(/\D/g, "")

    // Transforma valor em centavos
    value = Number(value) / 100
    // Atualiza valor no input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Formata o valor do padrão BRL
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    
    // Retorna valor formatado
    return value
}

// Captura o vento de submit do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    // Cria um objeto com detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    // Chama a função que adiciona item na lista
    expenseAdd(newExpense)
}

// Adiciona um nove item
function expenseAdd(newExpense) {
    try {
        // Cria o elemento para adicionar na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o ícone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona name e category na div de info das despesas
        expenseInfo.append(expenseName, expenseCategory)

        // Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Cria o ícone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        // Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // Adiciona o item na lista
        expenseList.append(expenseItem)

        // Limpa formulário
        formClear()

        // Atualiza totais
        updateTotals()

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas ")
        
    }
}

// Atualiza os totais
function updateTotals() {
    try {
        // Recupera li da lista ul
        const items = expenseList.children
        
        // Atualiza a quantidade de itens na lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // Variável para incrementar total
        let total = 0

        //Percorre cada item li da lista ul
        for(let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")
            

            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            // Converte o valor para float
            value = parseFloat(value)

            // Verifica se é número válido
            if (isNaN(value)) {
                return alert("Não é um número válido")
            }

            // Incremente o valor total
            total += Number(value)
        }

        // Cria span para adicionar R$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        // Formata valor e remove R$ que será exibido pela small
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        // Limpa o conteúdo do elemento
        expensesTotal.innerHTML = ""

        // Adiciona o símbolo da moeda e total formatado
        expensesTotal.append(symbolBRL, total)
    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar total")
    }

}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function(event) {
    // Verifica se o elemento clicado é o ícone de remoção
    if (event.target.classList.contains("remove-icon")) {
        // Obtém o elemento pai
        const item = event.target.closest(".expense")

        // Remove o item da lista
        item.remove()
    }

    // Atualiza os totais
    updateTotals()
})

function formClear() {
    // Limpa os inputs
    expense.value = ""
    category.value = ""
    amount.value = ""

    // Coloca foco no input
    expense.focus()
}
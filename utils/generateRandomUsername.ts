
const generateRandomUsername = () => {
    const defaultNoun = 'user'

    const randomNumber = Math.floor(Math.random() * 1000)


    return `${defaultNoun}_${randomNumber}`
}

export { generateRandomUsername }
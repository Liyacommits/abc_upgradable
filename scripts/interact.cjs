async function main() {
    const myContractAddress = "0xC5ABb714f5E0032b7360f31d5f35d289c4Cd4F8f"; // replace with your deployed contract address
    const myContract = await ethers.getContractAt("MyContractV2", myContractAddress);

    // Call incrementValue
    const tx = await myContract.incrementValue();
    await tx.wait();

    const newValue = await myContract.value();
    console.log("New value after increment:", newValue.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
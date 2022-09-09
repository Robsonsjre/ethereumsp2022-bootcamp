
task('deploylock', 'Deploy a whole local test environment')
  .addParam('time', 'timestamp of the timelock')
  .addFlag('verify', 'if true, it should verify the contract after the deployment')
  .setAction(async ({
    time,
    verify
    },
    hre
  ) => {
    console.log('comecando task')
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + time;
    console.log('unlockTime', unlockTime)
  
    const Lock = await hre.ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime);
    await lock.deployTransaction.wait(15)

    if (verify) {
        const verifyData = {
            address: lock.address,
            constructorArguments: [unlockTime]
          }
        await hre.run('verify:verify', verifyData)
        // verficar no etherscan
    }
    console.log("Lock to:", lock.address);
    return lock.address
  })

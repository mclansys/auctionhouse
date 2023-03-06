import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Metaplex, keypairIdentity,lamports, bundlrStorage,walletAdapterIdentity, } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from 'bs58';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const connection = new Connection(clusterApiUrl("devnet"));
  const wallsecretkey='4JQFuabAUxTfCwgsjLWSyTJTGKB8A54gNmNc6UU5ELT1WmAUHG15fxrLs2rn4hVvyTwuUzFSrsxdttAkuGV5iGEe';
  const byte_array = bs58.decode(wallsecretkey)
  const keyPair = Keypair.fromSecretKey(new Uint8Array(byte_array));
  const metaplex =  Metaplex.make(connection).use(keypairIdentity(keyPair));


const CreateListAuctionHouse = async() => {


//=====Auction house create======//
// const auctionHouseSettings = await metaplex
//     .auctionHouse()
//     .create({
//         sellerFeeBasisPoints: 500,// 5% fee
//         // authority: metaplex.identity(),
//         // requiresSignOff: true,
//         // canChangeSalePrice: true,
//         // hasAuctioneer: true, // to enable auctioneer
//         // auctioneerAuthority: metaplex.identity(),
//     });
//     console.log('auctionHouseSettings',auctionHouseSettings);



  //=====Find Auctionhouse  and List NFT======//
  const pubkey = new PublicKey("9p8fxc4bPfTKoUQpLx8yUEBkVoGszzkH3vWStMQ52LUA"); //wallet address
  const auctionHouse = await metaplex
  .auctionHouse()
  .findByCreatorAndMint({
      creator: new PublicKey("9p8fxc4bPfTKoUQpLx8yUEBkVoGszzkH3vWStMQ52LUA"), //wallet address
      treasuryMint: new PublicKey("So11111111111111111111111111111111111111112"),
      auctioneerAuthority: new PublicKey("9p8fxc4bPfTKoUQpLx8yUEBkVoGszzkH3vWStMQ52LUA"), //wallet address
  });
  console.log('auctionHouse',auctionHouse);

  const { listing, sellerTradeState } = await metaplex
    .auctionHouse()
    .list({
      auctionHouse: auctionHouse, //auctionHouse
      seller: metaplex.identity(),  
      authority: metaplex.identity(),
      auctioneerAuthority: metaplex.identity(),            
      // tokenAccount: pubkey,
      mintAccount: new PublicKey("jfDK9VRNKoN3RBCBeN2f2ABx3Ju1iHenTDtLnot2Mm8"),
      price: lamports(1000000000),
      // tokens: 1
    })
    console.log("listing",listing);
    console.log("sellerTradeState",sellerTradeState);


} 

  return (
    <>
      <Head>
        <title>AuctionHouse</title>
        <meta name="description" content="AuctionHouse create" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <div className='main_'>
       <button className='btn' onClick={CreateListAuctionHouse}>CreateListAuctionHouse</button>
     </div>
    </>
  )
}

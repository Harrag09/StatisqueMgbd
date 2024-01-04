import { connectToDatabase } from "../config/dbConfig.js";
import { ObjectId } from 'mongodb';

export const getLivestatById = async (req, res) => {
  const idCRM = req.cookies.idCRM;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('livestats');

    const livestat = await collection.findOne({ IdCRM: idCRM });

    if (!livestat) {
      return res.status(404).json({ error: "Livestat not found" });
    }

    res.json(livestat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateLivestat = async (req, res) => {
  const data = req.body;
  try {
    const db = await connectToDatabase();
    const collection = db.collection('livestats');
    
    const result = await collection.findOne({ IdCRM: data.IdCRM });
    console.log(data);
    if (result) {

      await collection.updateOne(
        { _id: result._id },
        {
          $set: {
            TotalHT: data.Total_HT,
            TVA: data.TVA,
            TotalTTC: data.Total_TTC,
            Especes: data.Especes,
            CarteBancaire: data.Carte_Bancaire,
            Cheques: data.Cheques,
            TicketResto: data.TicketResto,
            SurPlace: data.SurPlace,
            A_Emporter: data.A_Emporter,
            Livraison: data.Livraison
          }
        }
      );

      console.log("Updated successfully");
    } else {
      console.log('No result found.');

      await collection.insertOne({
        TotalHT: data.Total_HT,
        TVA: data.TVA,
        TotalTTC: data.Total_TTC,
        Especes: data.Especes,
        CarteBancaire: data.Carte_Bancaire,
        Cheques: data.Cheques,
        TicketResto: data.TicketResto,
        SurPlace: data.SurPlace,
        A_Emporter: data.A_Emporter,
        Livraison: data.Livraison,
        IdCRM: data.IdCRM
      });

      console.log("1 record inserted");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

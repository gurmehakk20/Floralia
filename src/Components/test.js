import React, { useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function test() {
  useEffect(() => {
    async function fetchDoc() {
      try {
        const ref = doc(db, "test", "doc1"); // path to your test doc
        const snap = await getDoc(ref);

        if (snap.exists()) {
          console.log("✅ Document data:", snap.data());
        } else {
          console.log("❌ No such document!");
        }
      } catch (err) {
        console.error("Firestore error:", err);
      }
    }

    fetchDoc();
  }, []);

  return <h1>Check the console for Firestore test</h1>;
}

export default test;

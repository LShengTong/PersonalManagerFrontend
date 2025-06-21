'use client'

import {InitUpdateView} from "@/app/init/initUpdateView";
import {store} from "@/app/common/store";
import {Provider} from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <InitUpdateView></InitUpdateView>
    </Provider>
  )
}

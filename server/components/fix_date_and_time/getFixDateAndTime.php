<?php

  function getFixDateAndTime($conn) {
    date_default_timezone_set("Asia/Manila");
    echo json_encode(["date" => date("Y-m-d"), "time" => date("H:i:s"), "day" => date("D")]);
  }

?>
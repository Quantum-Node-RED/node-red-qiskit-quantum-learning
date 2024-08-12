const runPythonScript = require("../../../../pythonShell.js");


module.exports = function (RED) {
  function PulseLinkCalToCusCirAnothNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.status({ fill: "red", shape: "dot", text: "You haven't learned this node yet." });

    node.on('input',  async function (msg) {
      node.status({ fill: "green", shape: "dot", text: "You have  learned this node." });

      const result = await new Promise((resolve,reject) => {

        
        runPythonScript(__dirname, "Pulse_Link_cal_to_custom_cir_another.py", arg = null, (err, results) => {
          if (err) throw err;
          return resolve(results);
        });
      
      });

      const newMsg = {
        payload: result,
        encoding: 'base64'
      }


      node.send(newMsg);
    });

    node.on('close', function () {
      node.status({ fill: "red", shape: "dot", text: "You haven't learned this node yet." });
    });
  }
  RED.nodes.registerType("pulse-link-cal-to-custom-cir-another", PulseLinkCalToCusCirAnothNode);
}


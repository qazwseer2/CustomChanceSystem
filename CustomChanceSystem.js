/*
CustomChanceSystem CustomNPC's Script By qazwseer2 
Minecraft v1.12.2
*/
var chance = [100, 90, 80, 70, 60, 50, 40, 0, 0] //Chances to drop any of item from NPC's inventory. Up - > Down
//Place items in NPC's inventory and change 'chance' variable to your chances
var ap = {}
function init(e) { ap = {} }
function ri(min, max) { return Math.floor(min + Math.random() * (max + 1 - min)) }
function damaged(e) {
  try {
    if (e.source != null) {
      if (e.source.type == 1) {
        if (ap[e.source.getName()] == undefined) {
          ap[e.source.getName()] = (e.damage * 100) / e.npc.getMaxHealth()
        } else {
          ap[e.source.getName()] = ap[e.source.getName()] + (e.damage * 100) / e.npc.getMaxHealth()
        }
      }
    }
    if (e.npc.getHealth() <= e.damage) {
      e.npc.kill()
      died(e)
    }
  }
  catch (err) {
    e.setCanceled(true)
    if (e.source != null) {
      if (e.source.getType() == 1) {
        e.source.message("§d§l" + e.npc.getName() + ":§c§lВозникла критическая ошибка! Если вы увидели это сообщение, немедленно сообщите о нём вашему Тех. Администратору!")
      }
    }
    hookMessage(alertH, rtrn)
    e.npc.getStats().setCombatRegen(1000)
    e.npc.getStats().setHealthRegen(1000)
    e.npc.getStats().setMaxHealth(100000000)
  }
}
function dCh(dmg, ch) { return Math.round((dmg / 100) * ch) }
function died(e) {
  var msg = []
  var item = e.npc.getInventory().getItemsRNG()
  var sortd = Object.keys(ap).sort(function (a, b) { return ap[b] - ap[a] })
  var all = 0
  for (var i = 0; i < sortd.length; i++) {
    var msg = []
    for (var u = 0; u < item.length; u++) {
      //print(sortd[i]+" "+dCh(ap[sortd[i]],chance[u]))
      var chd = ri(1, 100)
      var chan = dCh(ap[sortd[i]], chance[u])
      if (chd <= chan) {
        e.npc.giveItem(e.npc.world.getPlayer(sortd[i]), item[u])
      }
    }
  }
  ap = {}
}

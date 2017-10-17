define(["player","entityfactory","lib/bison"],function(e,t,n){var r=Class.extend({init:function(e,t){this.connection=null,this.host=e,this.port=t,this.connected_callback=null,this.spawn_callback=null,this.movement_callback=null,this.handlers=[],this.handlers[Types.Messages.WELCOME]=this.receiveWelcome,this.handlers[Types.Messages.MOVE]=this.receiveMove,this.handlers[Types.Messages.LOOTMOVE]=this.receiveLootMove,this.handlers[Types.Messages.ATTACK]=this.receiveAttack,this.handlers[Types.Messages.SPAWN]=this.receiveSpawn,this.handlers[Types.Messages.DESPAWN]=this.receiveDespawn,this.handlers[Types.Messages.SPAWN_BATCH]=this.receiveSpawnBatch,this.handlers[Types.Messages.HEALTH]=this.receiveHealth,this.handlers[Types.Messages.CHAT]=this.receiveChat,this.handlers[Types.Messages.EQUIP]=this.receiveEquipItem,this.handlers[Types.Messages.DROP]=this.receiveDrop,this.handlers[Types.Messages.TELEPORT]=this.receiveTeleport,this.handlers[Types.Messages.DAMAGE]=this.receiveDamage,this.handlers[Types.Messages.POPULATION]=this.receivePopulation,this.handlers[Types.Messages.LIST]=this.receiveList,this.handlers[Types.Messages.DESTROY]=this.receiveDestroy,this.handlers[Types.Messages.KILL]=this.receiveKill,this.handlers[Types.Messages.HP]=this.receiveHitPoints,this.handlers[Types.Messages.BLINK]=this.receiveBlink,this.useBison=!1,this.enable()},enable:function(){this.isListening=!0},disable:function(){this.isListening=!1},connect:function(e){var t="https://"+this.host+":"+this.port+"/",n=this;this.connection=io(),this.connection.on("connection",function(e){log.info("Connected to server "+t)}),e?(this.connection.emit("dispatch",!0),this.connection.on("dispatched",function(e){console.log("Dispatched: "),console.log(e),e.status==="OK"?n.dispatched_callback(e.host,e.port):e.status==="FULL"?console.log("BrowserQuest is currently at maximum player population. Please retry later."):console.log("Unknown error while connecting to BrowserQuest.")})):(this.connection.on("message",function(e){if(e==="go"){n.connected_callback&&n.connected_callback();return}if(e==="timeout"){n.isTimeout=!0;return}n.receiveMessage(e)}),this.connection.on("disconnect",function(){log.debug("Connection closed"),$("#container").addClass("error"),n.disconnected_callback&&(n.isTimeout?n.disconnected_callback("You have been disconnected for being inactive for too long"):n.disconnected_callback("The connection to BrowserQuest has been lost"))}))},sendMessage:function(e){this.connection.connected&&this.connection.emit("message",e)},receiveMessage:function(e){this.isListening&&(log.debug("data: "+e),e instanceof Array&&(e[0]instanceof Array?this.receiveActionBatch(e):this.receiveAction(e)))},receiveAction:function(e){var t=e[0];this.handlers[t]&&_.isFunction(this.handlers[t])?this.handlers[t].call(this,e):log.error("Unknown action : "+t)},receiveActionBatch:function(e){var t=this;_.each(e,function(e){t.receiveAction(e)})},receiveWelcome:function(e){var t=e[1],n=e[2],r=e[3],i=e[4],s=e[5];this.welcome_callback&&this.welcome_callback(t,n,r,i,s)},receiveMove:function(e){var t=e[1],n=e[2],r=e[3];this.move_callback&&this.move_callback(t,n,r)},receiveLootMove:function(e){var t=e[1],n=e[2];this.lootmove_callback&&this.lootmove_callback(t,n)},receiveAttack:function(e){var t=e[1],n=e[2];this.attack_callback&&this.attack_callback(t,n)},receiveSpawn:function(n){var r=n[1],i=n[2],s=n[3],o=n[4];if(Types.isItem(i)){var u=t.createEntity(i,r);this.spawn_item_callback&&this.spawn_item_callback(u,s,o)}else if(Types.isChest(i)){var u=t.createEntity(i,r);this.spawn_chest_callback&&this.spawn_chest_callback(u,s,o)}else{var a,f,l,c,h;Types.isPlayer(i)?(a=n[5],f=n[6],h=n[7],c=n[8],n.length>9&&(l=n[9])):Types.isMob(i)&&(f=n[5],n.length>6&&(l=n[6]));var p=t.createEntity(i,r,a);p instanceof e&&(p.weaponName=Types.getKindAsString(c),p.spriteName=Types.getKindAsString(h)),this.spawn_character_callback&&this.spawn_character_callback(p,s,o,f,l)}},receiveDespawn:function(e){var t=e[1];this.despawn_callback&&this.despawn_callback(t)},receiveHealth:function(e){var t=e[1],n=!1;e[2]&&(n=!0),this.health_callback&&this.health_callback(t,n)},receiveChat:function(e){var t=e[1],n=e[2];this.chat_callback&&this.chat_callback(t,n)},receiveEquipItem:function(e){var t=e[1],n=e[2];this.equip_callback&&this.equip_callback(t,n)},receiveDrop:function(e){var n=e[1],r=e[2],i=e[3],s=t.createEntity(i,r);s.wasDropped=!0,s.playersInvolved=e[4],this.drop_callback&&this.drop_callback(s,n)},receiveTeleport:function(e){var t=e[1],n=e[2],r=e[3];this.teleport_callback&&this.teleport_callback(t,n,r)},receiveDamage:function(e){var t=e[1],n=e[2];this.dmg_callback&&this.dmg_callback(t,n)},receivePopulation:function(e){var t=e[1],n=e[2];this.population_callback&&this.population_callback(t,n)},receiveKill:function(e){var t=e[1];this.kill_callback&&this.kill_callback(t)},receiveList:function(e){e.shift(),this.list_callback&&this.list_callback(e)},receiveDestroy:function(e){var t=e[1];this.destroy_callback&&this.destroy_callback(t)},receiveHitPoints:function(e){var t=e[1];this.hp_callback&&this.hp_callback(t)},receiveBlink:function(e){var t=e[1];this.blink_callback&&this.blink_callback(t)},onDispatched:function(e){this.dispatched_callback=e},onConnected:function(e){this.connected_callback=e},onDisconnected:function(e){this.disconnected_callback=e},onWelcome:function(e){this.welcome_callback=e},onSpawnCharacter:function(e){this.spawn_character_callback=e},onSpawnItem:function(e){this.spawn_item_callback=e},onSpawnChest:function(e){this.spawn_chest_callback=e},onDespawnEntity:function(e){this.despawn_callback=e},onEntityMove:function(e){this.move_callback=e},onEntityAttack:function(e){this.attack_callback=e},onPlayerChangeHealth:function(e){this.health_callback=e},onPlayerEquipItem:function(e){this.equip_callback=e},onPlayerMoveToItem:function(e){this.lootmove_callback=e},onPlayerTeleport:function(e){this.teleport_callback=e},onChatMessage:function(e){this.chat_callback=e},onDropItem:function(e){this.drop_callback=e},onPlayerDamageMob:function(e){this.dmg_callback=e},onPlayerKillMob:function(e){this.kill_callback=e},onPopulationChange:function(e){this.population_callback=e},onEntityList:function(e){this.list_callback=e},onEntityDestroy:function(e){this.destroy_callback=e},onPlayerChangeMaxHitPoints:function(e){this.hp_callback=e},onItemBlink:function(e){this.blink_callback=e},sendHello:function(e){this.sendMessage([Types.Messages.HELLO,e.name,Types.getKindFromString(e.getSpriteName()),Types.getKindFromString(e.getWeaponName())])},sendMove:function(e,t){this.sendMessage([Types.Messages.MOVE,e,t])},sendLootMove:function(e,t,n){this.sendMessage([Types.Messages.LOOTMOVE,t,n,e.id])},sendAggro:function(e){this.sendMessage([Types.Messages.AGGRO,e.id])},sendAttack:function(e){this.sendMessage([Types.Messages.ATTACK,e.id])},sendHit:function(e){this.sendMessage([Types.Messages.HIT,e.id])},sendHurt:function(e){this.sendMessage([Types.Messages.HURT,e.id])},sendChat:function(e){this.sendMessage([Types.Messages.CHAT,e])},sendLoot:function(e){this.sendMessage([Types.Messages.LOOT,e.id])},sendTeleport:function(e,t){this.sendMessage([Types.Messages.TELEPORT,e,t])},sendWho:function(e){e.unshift(Types.Messages.WHO),this.sendMessage(e)},sendZone:function(){this.sendMessage([Types.Messages.ZONE])},sendOpen:function(e){this.sendMessage([Types.Messages.OPEN,e.id])},sendCheck:function(e){this.sendMessage([Types.Messages.CHECK,e])}});return r});
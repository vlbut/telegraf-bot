// import { Context } from 'telegraf';
//
// export enum HowToHelpTypes {
// 	PhysicalProtest = 'physicalProtest',
// 	LawProtest = 'lawProtest',
// 	InternetProtest = 'internetProtest',
// 	InformingClosePeople = 'informingClosePeople',
// 	MaterialAid = 'materialAid',
// }
//
// type howToHelpHandler = (ctx: Context) => void;
// const physicalProtestInnerText =
// const physicalProtestHandle: howToHelpHandler = ctx => {
// 	const innerText = helpTypes[HowToHelpTypes.PhysicalProtest].innerText;
// 	ctx.reply(innerText);
// };
// const lawProtestHandle: howToHelpHandler = ctx => {
// 	const innerText = helpTypes[HowToHelpTypes.LawProtest].innerText;
// 	ctx.reply(innerText);
// };
// const internetProtestHandle: howToHelpHandler = ctx => {
// 	const innerText = helpTypes[HowToHelpTypes.InternetProtest].innerText;
// 	ctx.reply(innerText);
// };
// const informingClosePeopleHandle: howToHelpHandler = ctx => {
// 	const innerText = helpTypes[HowToHelpTypes.InformingClosePeople].innerText;
// 	ctx.reply(innerText);
// };
// const materialAidHandle: howToHelpHandler = ctx => {
// 	const innerText = helpTypes[HowToHelpTypes.MaterialAid].innerText;
// 	ctx.reply(innerText);
// };
// const defaultHandler: howToHelpHandler = ctx => {
// 	ctx.reply('Я не могу подсказать вам по этой команде');
// };
//
// export const howToHelpMapper: Record<HowToHelpTypes | 'default', howToHelpHandler> = {
// 	[HowToHelpTypes.PhysicalProtest]: physicalProtestHandle,
// 	[HowToHelpTypes.LawProtest]: lawProtestHandle,
// 	[HowToHelpTypes.InternetProtest]: internetProtestHandle,
// 	[HowToHelpTypes.InformingClosePeople]: informingClosePeopleHandle,
// 	[HowToHelpTypes.MaterialAid]: materialAidHandle,
// 	default: defaultHandler,
// };

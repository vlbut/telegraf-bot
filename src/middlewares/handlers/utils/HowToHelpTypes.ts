import { helpTypes } from '../../../db/whatToHelp.json';

export enum HowToHelpTypes {
	PhysicalProtest = 'physicalProtest',
	LawProtest = 'lawProtest',
	InternetProtest = 'internetProtest',
	InformingClosePeople = 'informingClosePeople',
	MaterialAid = 'materialAid',
}

const physicalProtestHandle = ctx => {
	const innerText = helpTypes[HowToHelpTypes.PhysicalProtest].innerText;
	ctx.reply(innerText);
};
const lawProtestHandle = ctx => {
	const innerText = helpTypes[HowToHelpTypes.LawProtest].innerText;
	ctx.reply(innerText);
};
const internetProtestHandle = ctx => {
	const innerText = helpTypes[HowToHelpTypes.InternetProtest].innerText;
	ctx.reply(innerText);
};
const informingClosePeopleHandle = ctx => {
	const innerText = helpTypes[HowToHelpTypes.InformingClosePeople].innerText;
	ctx.reply(innerText);
};
const materialAidHandle = ctx => {
	const innerText = helpTypes[HowToHelpTypes.MaterialAid].innerText;
	ctx.reply(innerText);
};
const defaultHandler = ctx => {
	ctx.reply('Я не могу подсказать вам по этой команде');
};

export const howToHelpMapper = {
	[HowToHelpTypes.PhysicalProtest]: physicalProtestHandle,
	[HowToHelpTypes.LawProtest]: lawProtestHandle,
	[HowToHelpTypes.InternetProtest]: internetProtestHandle,
	[HowToHelpTypes.InformingClosePeople]: informingClosePeopleHandle,
	[HowToHelpTypes.MaterialAid]: materialAidHandle,
	default: defaultHandler,
};

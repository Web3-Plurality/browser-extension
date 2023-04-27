import logo from '../images/logo.png';

window.onload = () => {
    document.dispatchEvent(new CustomEvent('ContentScriptEvent', {detail: "Hello from Content Script"}));
    alert("Hello Event Dispatched");
}
export const sendIdentityCommitment = (identityCommitment: string) => {
    document.dispatchEvent(new CustomEvent('IdentityEvent', {detail: identityCommitment}));
    alert ("Identity commitment sent: "+identityCommitment);   
}
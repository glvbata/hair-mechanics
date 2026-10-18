/**
 * Loud "this is a draft" strip for pages whose copy still needs sign-off.
 * Remove the <DraftBanner> from the page once the owner approves the wording.
 */
const DraftBanner = ({ text }: { text: string }) => (
  <div
    role="status"
    className="bg-amber-400 text-gray-900 text-center text-sm font-bold uppercase tracking-wider px-4 py-2"
  >
    {text}
  </div>
);

export default DraftBanner;

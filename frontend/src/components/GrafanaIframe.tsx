const GrafanaIframe = () => {
    return (
        <iframe
            src="http://localhost:3000/d/YOUR_DASHBOARD_UID?orgId=1&refresh=10s"
            width="100%"
            height="600"
            frameBorder="0"
        ></iframe>
    );
};

export default GrafanaIframe;

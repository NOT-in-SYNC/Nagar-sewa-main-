import React from "react";

const GovernmentTopBar: React.FC = () => {
  return (
    <div className="w-full bg-background border-b border-border">
      <div className="h-1 w-full flex">
        <div className="h-full flex-1" style={{ backgroundColor: '#FF9933' }}></div>
        <div className="h-full flex-1" style={{ backgroundColor: '#FFFFFF' }}></div>
        <div className="h-full flex-1" style={{ backgroundColor: '#13851B' }}></div>
      </div>
      <div className="container mx-auto px-6 py-2 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-foreground">Government of India</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">Digital Civic Services Portal</span>
        </div>
        <div className="text-muted-foreground hidden sm:block">Secure • Verified • Accessible</div>
      </div>
    </div>
  );
};

export default GovernmentTopBar;


